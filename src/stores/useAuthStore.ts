import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

export type UserStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

/**
 * Zustand를 사용해 사용자 정보를 전역으로 관리하는 훅
 * - user: 현재 로그인한 사용자 정보, 초기값(로그인 안된 상태)은 null입니다
 * - login: 로그인한 유저 정보를 저장합니다, 로그인보다는 프로필 설정에 가깝습니다.
 * !!프로필 수정시 login 함수로 설정해주셔야 합니다!!
 * - logout: 현재 로그인 유저 정보를 null로 설정하여 지웁니다.
 */
const useAuthStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      login: (user: User) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-store',
    },
  ),
);

export default useAuthStore;
