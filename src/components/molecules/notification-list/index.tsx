import { PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { NotificationItem } from '../../atoms/notification-item';
import { Popover } from "@/components/ui/popover";
import { useState, useEffect } from 'react';
import { Notification as NotificationType } from '@/types/index';
import useNotificationStore from '@/stores/useNotificationStore';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import useAuthStore from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { request } from '@/api/request';
import Image from 'next/image';

const MAX_PAGE_SIZE = 10;

export const NotificationList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setNotifications, setUnreadCount } = useNotificationStore();
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const notifications = useNotificationStore((state) => state.notifications);
  const user = useAuthStore((state) => state.user);

  // 전체 알림 목록 조회
  // TODO: 백엔드 데이터 타입 고쳐야됨 - 프젝 끝나고 고칠예정
  const { data, fetchNextPage, hasNextPage } = useFetchItems({
    url: '/v1/notification',
    queryParams: {
      cursor: 0,
      size: MAX_PAGE_SIZE,
    },
  });

  // 안 읽은 알림 목록 조회
  const { data: unreadData, isLoading: isUnreadLoading } = useQuery<{ unreadCount: number }>({
    queryKey: ['unread-count'],
    queryFn: async () => {
      return await request.get('/v1/notification/unread-count',{}, {
        credentials: 'include',
      });
    }
  });

  const {ref} = useFetchInView({
    fetchNextPage,
    isLoading: isUnreadLoading,
  });
  
  useEffect(() => {
    if (!data || !isOpen || notifications.length) return;

    //@ts-expect-error 백엔드 수정되면 타입도 수정
    const page: {
      status: { code: number; message: string; success: boolean };
      notifications: { items: NotificationType[]; hasNext: boolean; cursor: number };
    } = data.pages[0];
    
    const items = page.notifications?.items ?? [];
    
    const newItems = items.map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, created_at, createdAt, isRead, read, message, ...rest} = item;
      return {
        ...rest,
        message: item.content || item.message,
        isRead: !!(item.isRead || item.read),
        createdAt: item.createdAt || item.created_at,
      };
    });
    
    setNotifications(newItems);
  }, [isOpen, data, setNotifications]);

  useEffect(() => {
    if (!unreadData) return;
    setUnreadCount(Number(unreadData.unreadCount) || 0);
  }, [unreadData, setUnreadCount]);

  

  const openhandler = (open: boolean) => {
    console.log('notifications', notifications);
    setIsOpen(open);
  };

  if(!user) return null;

  return (
    <Popover open={isOpen} onOpenChange={openhandler}>
      <PopoverTrigger className="relative">
        <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
           <Image src={`/icons/alarm-${unreadCount > 0 ? 'active' : 'default'}.svg`} alt="알림" width={24} height={24} className="opacity-70" />
           {notifications.length}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 shadow-lg" align="end">
        <div className="flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700">알림</h4>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length ? (
              notifications?.map((notification: NotificationType) => (
                notification && (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification}
                    onClose={() => setIsOpen(false)}
                  />
                )
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Image 
                  src="/icons/alarm-default.svg" 
                  alt="빈 알림" 
                  width={32} 
                  height={32} 
                  className="opacity-50 mb-2"
                />
                <p className="text-sm">알림이 없습니다</p>
              </div>
            )}
            {hasNextPage && <div ref={ref} className="h-4" />}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
