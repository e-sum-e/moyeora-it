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
  
  // 전체 알림 목록 저장
  useEffect(() => {
    if (!data || !isOpen) return;
    const notificationList = flattenPages(data.pages)
    if(Array.isArray(notificationList)) {
      //@ts-expect-error 백엔드 타입 에러
      const items = notificationList[0].items;
      setNotifications(items);
    }else{
      setNotifications(notificationList);
    }
  }, [isOpen, data, setNotifications]);

  // 안 읽은 알림 개수 저장
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
      <PopoverTrigger>
        <Image src="/icons/alarm-default.svg" alt="action" width={24} height={24} />
       
       {unreadCount > 0 && <NotificationBadge /> }
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <h4>Notification</h4>
        {notifications.length ? notifications?.map((notification: NotificationType) => (
          notification &&
          <NotificationItem 
            key={notification.id} 
            notification={notification}
            onClose={() => setIsOpen(false)}
          />
        )) : <div>알림이 없습니다.</div>}

        {hasNextPage && <div ref={ref} />}
      </PopoverContent>
    </Popover>
  );
};
