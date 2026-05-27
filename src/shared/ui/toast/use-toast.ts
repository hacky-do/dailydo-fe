import { useToastStore } from './toast.store';
import type { UseToastReturn } from './toast.types';

export function useToast(): UseToastReturn {
  const toast = useToastStore((state) => state.toast);
  return { toast };
}
