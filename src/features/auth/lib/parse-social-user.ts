export const parseSocialUser = (raw: string | null) => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as {
      email?: string;
      name?: string;
      profileImage?: string;
    };
    return {
      email: parsed.email ?? '',
      name: parsed.name ?? '',
      profileImage: parsed.profileImage ?? '',
    };
  } catch {
    return null;
  }
};
