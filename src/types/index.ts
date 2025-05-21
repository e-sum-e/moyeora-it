//전역 파일 타입 정리

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