export const parseSocialUser = (raw: string | null) => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as {
      email?: string;
    };
    if (!parsed.email) return null;
    return {
      email: parsed.email,
    };
  } catch {
    return null;
  }
};
