"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function IndustrySelect({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="w-full">
      <label className="block text-[12px] mb-1">
        Industry <span className="text-red-500">*</span>
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-[47px] rounded-md border px-3">
          <SelectValue placeholder="Select Industry" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl shadow-lg">
          <SelectItem value="Agriculture">Agriculture</SelectItem>
          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
          <SelectItem value="Construction">Construction</SelectItem>
          <SelectItem value="Retail">Retail</SelectItem>
          <SelectItem value="Banking">Banking and Finance</SelectItem>
          <SelectItem value="Education">Education</SelectItem>
          <SelectItem value="Tourism">Tourism and Hospitality</SelectItem>
          <SelectItem value="Transportation">Transportation and Logistics</SelectItem>
          <SelectItem value="IT">Information Technology</SelectItem>
          <SelectItem value="Healthcare">Healthcare</SelectItem>
          <SelectItem value="Communication">Communication Services</SelectItem>
          <SelectItem value="Real">Real Estate</SelectItem>
          <SelectItem value="Others">Others...</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
