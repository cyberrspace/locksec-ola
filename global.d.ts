// global.d.ts
// --- Paystack minimal types used in the project ---

declare global {
  interface PaystackSetupOptions {
    key: string;
    email: string;
    amount: number; // in kobo
    currency?: string;
    ref?: string;
    metadata?: Record<string, unknown>;
    callback?: (response: {
      status: string;
      reference?: string;
      [k: string]: unknown;
    }) => void;
    onClose?: () => void;
  }

  interface PaystackHandler {
    openIframe: () => void;
    // there might be other methods in some versions, add if needed
  }

  interface PaystackPop {
    setup: (opts: PaystackSetupOptions) => PaystackHandler;
  }

  interface Window {
    PaystackPop?: PaystackPop;
  }
}

export { };
