const RESET_HOUR = 5;

/**
 * 현재 시각 기준으로 다음 오전 5시까지 남은 시간을 "HH:MM:SS" 형식으로 반환합니다.
 * 사이클: 오전 5시 → 다음날 오전 5시
 */
export function getTimeUntilReset(now = new Date()): string {
  const next = new Date(now);
  next.setMinutes(0, 0, 0);
  next.setHours(RESET_HOUR);

  if (now.getHours() >= RESET_HOUR) {
    next.setDate(next.getDate() + 1);
  }

  const totalSeconds = Math.floor((next.getTime() - now.getTime()) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
