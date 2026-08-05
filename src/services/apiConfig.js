// Shared base URL for the 22studio-payroll-system public API surface
// (order tracking + CMS content live under the same host/base path).
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://22studio-payroll-system.vercel.app/api/public";
