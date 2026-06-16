import { z } from 'zod';

import { NICKNAME_HELPER_TEXT, NICKNAME_REGEX } from '@/entities/user';

export const profileEditSchema = z.object({
  name: z
    .string()
    .refine(
      (val) => val === '' || NICKNAME_REGEX.test(val),
      NICKNAME_HELPER_TEXT,
    ),
  description: z.string(),
});

export type ProfileEditFormValues = z.infer<typeof profileEditSchema>;
