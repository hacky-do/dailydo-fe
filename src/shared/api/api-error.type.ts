export interface ApiErrorData {
  code: number;
  error: string;
  message: string;
}

export class ApiError extends Error implements ApiErrorData {
  code: number;
  error: string;

  constructor({ code, error, message }: ApiErrorData) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.error = error;
  }
}

export const API_ERRORS = {
  UNAUTHORIZED: {
    code: 401,
    error: 'UNAUTHORIZED',
    message: '인증이 필요합니다.',
  },
} as const satisfies Record<string, ApiErrorData>;
