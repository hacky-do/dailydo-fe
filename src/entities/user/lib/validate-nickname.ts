// SCR-SIGNUP-01-01: 한글(완성형)·영문·숫자 2~8글자. 공백·자음/모음 단독은 가-힣 범위에서 자동 배제된다.
export const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{2,8}$/;

export const NICKNAME_HELPER_TEXT = '최소 2글자, 최대 8글자까지 입력 가능해요.';

export const validateNickname = (value: string): true | string =>
  NICKNAME_REGEX.test(value) ? true : NICKNAME_HELPER_TEXT;
