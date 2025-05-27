import { NOTIFICATIONS } from '@/mocks/handler/notifications';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';
import useNotificationStore from './useNotificationStore';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useNotificationStore 테스트', () => {
  it('clearAllNotifications: 서버에 DELETE 요청 후 상태 초기화', async () => {
    server.use(
      http.delete('/api/notifications', () => {
        return HttpResponse.json({ result: { success: true } });
      })
    );
    
    useNotificationStore.setState({
      notifications: NOTIFICATIONS.map(n => ({ 
        ...n, 
        createdAt: new Date(n.createdAt),
        url: n.url ?? null 
      })),
      hasUnreadNotification: true,
    });

    await useNotificationStore.getState().clearAllNotifications();

    const { notifications, hasUnreadNotification } = useNotificationStore.getState();
    expect(notifications).toEqual([]);
    expect(hasUnreadNotification).toBe(false);
  });
});