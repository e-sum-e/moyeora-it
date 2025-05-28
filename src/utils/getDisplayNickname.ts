/**
 * 화면에 표시할 사용자 닉네임을 반환하는 함수
 * @param nickname
 * @param email
 * @returns 화면 표시용 사용자 닉네임
 */
export const getDisplayNickname = (nickname: string | null, email: string) => {
  return nickname || email.split('@')[0];
};
