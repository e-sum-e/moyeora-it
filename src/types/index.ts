//전역 파일 타입 정리
import { Position, Skill } from './enums';

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

export type Group = {
  id: number;
  title: string;
  deadline: Date;
  startDate: Date; // 모임의 시작일
  endDate: Date; // 모임의 종료일
  maxParticipants: number;
  description: string;
  position: Position[];
  skills: Skill[];
  createdAt: Date;
  isBookmark: boolean;
  autoAllow: boolean;
};
