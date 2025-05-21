//전역 파일 타입 정리
import { Position, Skill } from './enums';

export enum Position {
  PM,
  PL,
  AA,
  TA,
  DA,
  QA,
  FE,
  BE,
  FS,
}

export enum Skill {
  JAVA,
  JavaScript,
  "HTML/CSS",
  React,
  "Vue.js",
  Kotlin,
  Spring,
}

export type User = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
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
