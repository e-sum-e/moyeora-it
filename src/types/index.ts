//전역 파일 타입 정리

export type User = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
};

/** 모임 만들기 폼에 사용되는 데이터들의 타입 */
export type WriteForm = {
  title: string;
  maxParticipants: number;
  deadline: Date;
  startDate: Date;
  endDate: Date;
};
