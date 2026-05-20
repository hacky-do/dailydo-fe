const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_URL을 찾을 수 없습니다.');

export { BASE_URL };
