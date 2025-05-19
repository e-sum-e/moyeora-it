import { create } from "zustand";

// TODO: 예시로 넣어둔 Position, Skill
export type Position = "PM" | "PL" | "AA" | "TA" | "DA" | "QA" | "FE" | "BE" | "FS";
export type Skill = "JAVA" | "JavaScript" | "HTML/CSS" | "React" | "Vue.js" | "Kotlin" | "Spring";

export type User = {
  userId: string
  email: string
  nickname: string | null
  profileImage: string | null
  position: Position | null
  skills: Skill[] | null
}

export type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
}

/**
 * Zustand를 사용해 사용자 정보를 전역으로 관리하는 훅
 * - user: 현재 로그인한 사용자 정보, 초기값(로그인 안된 상태)은 null입니다
 * - setUser: 사용자 정보를 설정하거나 초기화하는 함수, 로그아웃시 setUser(null)
 */
const useAuthStore = create<UserStore>()(set => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}))

export default useAuthStore;