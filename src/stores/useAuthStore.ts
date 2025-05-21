import { create } from 'zustand';

// TODO: 예시로 넣어둔 Position, Skill
export type Position =
  | 'PM'
  | 'PL'
  | 'AA'
  | 'TA'
  | 'DA'
  | 'QA'
  | 'FE'
  | 'BE'
  | 'FS';
export type Skill =
  | 'JAVA'
  | 'JavaScript'
  | 'HTML/CSS'
  | 'React'
  | 'Vue.js'
  | 'Kotlin'
  | 'Spring';

export type User = {
  userId: string;
  email: string;
  nickname: string | null;
  profileImage: string | null;
  position: Position | null;
  skills: Skill[] | null;
};

export type UserStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

/**
 * Zustand를 사용해 사용자 정보를 전역으로 관리하는 훅
 * - user: 현재 로그인한 사용자 정보, 초기값(로그인 안된 상태)은 null입니다
 * - login: 로그인한 유저 정보를 저장합니다
 * - logout: 현재 로그인 유저 정보를 null로 설정하여 지웁니다.
 */
const useAuthStore = create<UserStore>()((set) => ({
  user: null,
  login: (user: User) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
