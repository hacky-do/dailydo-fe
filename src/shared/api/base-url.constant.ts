const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
export function getBaseUrl(): string {
  if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_URL을 찾을 수 없습니다.');
  }
  return BASE_URL;
}

export { BASE_URL };
