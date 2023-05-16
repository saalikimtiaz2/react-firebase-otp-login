/* eslint-disable no-unused-vars */
export {};

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    gtag: (...args: any[]) => void;
  }
}
