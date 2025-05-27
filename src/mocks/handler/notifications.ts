import { eNotification } from '@/types/enums';
import { http, HttpResponse } from 'msw';

const NOTIFICATIONS = [
  {
    id: 1,
    message: '알림 메시지1',
    isRead: false,
    createdAt: '2025-05-20',
    type: eNotification.GROUP_HAS_PARTICIPANT,
    url: 'http://localhost:3000/groups/1',
  },
  {
    id: 2,
    message: '알림 메시지2',
    isRead: true,
    createdAt: '2025-05-20',
    type: eNotification.FOLLOWER_ADDED,
  },
];

export const notificationsHandlers = [
  http.get('http://localhost:4000/api/notifications', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const isRead = searchParams.get('isRead');

    const filteredNotifications = NOTIFICATIONS.filter((notification) => {
      return isRead === 'false' ? !notification.isRead : true;
    });

    return HttpResponse.json({
      items: filteredNotifications,
    });
  }),
];
