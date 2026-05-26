export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  message: string;
  type: ToastType;
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
}

export interface UseToastReturn {
  toast: (options: ToastOptions) => void;
}
