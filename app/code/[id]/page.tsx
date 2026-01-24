"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ContentWrapper from "@/components/common/ContentWrapper";
import CodeHero from "@/components/GeneratedPage/CodeHero";
import CodeDetails from "@/components/GeneratedPage/CodeDetails";
import { getAccessCodeById } from "@/src/services/AccessCodes";
import { AccessCode } from "@/types/AccessCode";

export default function CodeByIdPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<AccessCode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCode = async () => {
      try {
        let codeData: AccessCode | null = null;

        // ✅ Try sessionStorage first
        const stored = sessionStorage.getItem("generatedAccessCode");
        if (stored) {
          const parsed: AccessCode = JSON.parse(stored);
          if (parsed._id === id) {
            codeData = parsed;
          }
        }

        // ✅ Otherwise fetch from backend
        if (!codeData) {
          codeData = await getAccessCodeById(id);
        }

        setData(codeData);
      } catch (err) {
        console.error("Failed to fetch access code", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!data) return <p className="p-6 text-center">Code not found</p>;

  return (
    <ContentWrapper>
      <main className="min-h-screen flex flex-col items-center py-6">
        <section className="w-full max-w-md">
          <CodeHero />
        </section>

        <section className="w-full max-w-md mt-6">
          <CodeDetails data={data} />
        </section>
      </main>
    </ContentWrapper>
  );
}
