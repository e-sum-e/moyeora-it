//전역 파일 타입 정리
import { eNotification, Position, Skill } from './enums';

export type User = {
  userId: string;
  email: string;
  nickname: string | null;
  profileImage: string | null;
  position: Position | null;
  skills: Skill[] | null;
};

export enum GroupType {
  STUDY = 'study',
  PROJECT = 'project',
}

/** 모임 만들기 폼에 사용되는 데이터들의 타입 */
export type WriteForm = {
  title: string;
  maxParticipants: number;
  deadline: Date;
  startDate: Date;
  endDate: Date;
  description: string;
  autoAllow: boolean;
  type: GroupType;
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
  type: GroupType;
};

export type Notification = {
  id: number;
  message: string | null; // 추후 채팅의 경우 가장 간략한 채팅메세지 전달용 현재는 빈값으로 리턴
  isRead: boolean; // 읽음 여부 default: false
  createdAt: Date; // 알람 생성날짜
  type: eNotification;
  url: string | null; // 연결되는 url -> NotificationType에 따라 필요한 부분 다름
};
