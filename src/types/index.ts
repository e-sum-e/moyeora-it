//전역 파일 타입 정리

export enum Position {
  PM = "PM",
  PL = "PL",
  AA = "AA",
  TA = "TA",
  DA = "DA",
  QA = "QA",
  FE = "FE",
  BE = "BE",
  FS = "FS",
}

export enum Skill {
  JAVA = "JAVA",
  JavaScript = "JavaScript",
  "HTML/CSS" = "HTML/CSS",
  React = "React",
  "Vue.js" = "Vue.js",
  Kotlin = "Kotlin",
  Spring = "Spring",
}

export type User = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
};
