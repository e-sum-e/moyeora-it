import { PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { NotificationItem } from '../../atoms/notification-item';
import { Popover } from "@/components/ui/popover";
import { useState, useEffect } from 'react';
import { Notification as NotificationType } from '@/types/index';
import useNotificationStore from '@/stores/useNotificationStore';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import useAuthStore from '@/stores/useAuthStore';
import { NotificationBadge } from '../notification-badge';
import { useQuery } from '@tanstack/react-query';
import { request } from '@/api/request';
import flattenPages from '@/utils/flattenPages';
import Image from 'next/image';

const MAX_PAGE_SIZE = 10;

export const NotificationList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, setNotifications, setUnreadCount, unreadCount } = useNotificationStore();
  const user = useAuthStore((state) => state.user);

  // 전체 알림 목록 조회
  const { data, fetchNextPage, hasNextPage } = useFetchItems<NotificationType>({
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
    if (!data || !isOpen) return;
    const notificationList = flattenPages(data.pages)
    setNotifications(notificationList);
  }, [isOpen, data, setNotifications]);

  useEffect(() => {
    if (!unreadData) return;
    setUnreadCount(unreadData.unreadCount);
  }, [unreadData, setUnreadCount]);

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  if(!user) return null;

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger className="relative">
        <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <Image 
            src="/icons/alarm-default.svg" 
            alt="알림" 
            width={24} 
            height={24}
            className="opacity-70" 
          />
        </div>
        {unreadCount > 0 && <NotificationBadge />}
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
