export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  message: string;
  type: ToastType;
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
}

export interface ToastPromiseOptions<T = unknown> {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((err: unknown) => string);
}

export interface UseToastReturn {
  toast: (options: ToastOptions) => void;
  promise: <T>(p: Promise<T>, options: ToastPromiseOptions<T>) => Promise<T>;
}
