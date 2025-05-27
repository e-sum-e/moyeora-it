import { create } from 'zustand';
import { Notification } from '@/types';

export type NotificationState = {
  notifications: Notification[];
  hasUnreadNotification: boolean;
}

export type NotificationActions = {
	init: () => void;
  addNotification: (notification: Notification) => void;
  setNotifications: (notifications: Notification[]) => void;
  setReadNotifications: (id: number) => void;
  setHasUnreadNotification: (value: boolean) => void;
  clearAllNotifications: () => Promise<void>;
}

type NotificationStore = NotificationState & NotificationActions;

const useNotificationStore = create<NotificationStore>((set) => ({
	notifications: [],
	hasUnreadNotification: false,
	addNotification: (notification: Notification) => set((state) => {
		// 이미 같은 ID의 알림이 있는지 확인
		const exists = state.notifications.some(n => n.id === notification.id);
		if (exists) return state;  // 이미 존재하면 상태 변경 없음
		
		return {
			notifications: [notification, ...state.notifications],
			hasUnreadNotification: true,
		};
	}),
  setNotifications: (notifications: Notification[]) => set(() => ({
    notifications,
  })),
  setReadNotifications: (id: number) => set((state) => ({
    notifications: state.notifications.map((notification: Notification) => ({
      ...notification,
      isRead: notification.id === id ? true : notification.isRead,
    })),
  })),
  setHasUnreadNotification: (status: boolean) => set(() => ({
    hasUnreadNotification: status,
  })),
  clearAllNotifications: async () => {
    await fetch('/api/notifications', { method: 'DELETE' });
    set(() => ({
      notifications: [],
      hasUnreadNotification: false,
    }));
  },
	init: () => set(() => ({
      notifications: [],
      hasUnreadNotification: false,
    })),
}));

export default useNotificationStore;
