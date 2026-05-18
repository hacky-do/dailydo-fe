import { cookies } from 'next/headers'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_URL을 찾을 수 없습니다.')

export const fetchServer = async <T = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<T | undefined> => {
  const cookieStore = await cookies()

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
      ...options?.headers,
    },
  })

  if (res.status === 401) {
    throw new Error('Unauthorized')
  }

  if (res.status === 204) {
    return undefined
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error?.message ?? 'API ERROR가 발생했습니다.')
  }

  return res.json() as Promise<T>
}
