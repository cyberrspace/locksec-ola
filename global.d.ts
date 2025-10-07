// global.d.ts

export { };

declare global {
  interface PaystackPop {
    setup: (options: {
      key: string;
      email: string;
      amount: number;
      currency?: string;
      ref?: string;
      onClose?: () => void;
      callback?: (response: {
        status: string;
        reference?: string;
      }) => void;
    }) => {
      openIframe: () => void;
    };
  }

  interface Window {
    PaystackPop: PaystackPop;
  }
}
