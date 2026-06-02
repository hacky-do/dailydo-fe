import { NICKNAME_HELPER_TEXT, validateNickname } from './validate-nickname';

describe('validateNickname', () => {
  test.each(['두두', 'ab', 'abcdefgh', '가나다라마바사아', 'user1', '한글2'])(
    '한글·영문·숫자 2~8글자 "%s"은 통과한다',
    (value) => {
      expect(validateNickname(value)).toBe(true);
    },
  );

  test.each([
    ['', '미입력'],
    ['두', '1글자'],
    ['가나다라마바사아자', '9글자'],
    ['두 두', '공백 포함'],
    ['ㄱㄴ', '자음 단독'],
    ['ㅏㅑ', '모음 단독'],
    ['user!', '특수문자'],
    ['두두😀', '이모지'],
  ])('"%s"(%s)은 안내 문구를 반환한다', (value) => {
    expect(validateNickname(value)).toBe(NICKNAME_HELPER_TEXT);
  });
});
