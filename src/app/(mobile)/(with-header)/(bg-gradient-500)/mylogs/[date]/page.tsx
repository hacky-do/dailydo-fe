const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

interface PageProps {
  params: Promise<{ date: string }>;
}

export default async function Page({ params }: PageProps) {
  const { date } = await params;

  if (!DATE_REGEX.test(date)) {
    throw new Error(`잘못된 날짜 형식입니다.`);
  }
}
