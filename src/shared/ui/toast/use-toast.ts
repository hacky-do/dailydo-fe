import type { UseToastReturn } from './toast.types';
import { useToastStore } from './toast-store';

export function useToast(): UseToastReturn {
  const toast = useToastStore((state) => state.toast);
  return { toast };
}
