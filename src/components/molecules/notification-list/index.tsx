import { Avatar } from '../../atoms/avatar';
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

export const NotificationList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { notifications, setNotifications, setUnreadCount, unreadCount } = useNotificationStore();
  const user = useAuthStore((state) => state.user);

  // 전체 알림 목록 조회
  const { data, fetchNextPage, hasNextPage } = useFetchItems<NotificationType>({
    url: '/notifications',
  });

  // 안 읽은 알림 목록 조회
  const { data: unreadData, isLoading: isUnreadLoading } = useQuery<{ unreadCount: number }>({
    queryKey: ['unread-count'],
    queryFn: async () => {
      return await request.get('/notifications/unread-count');
    }
  });

  const {ref} = useFetchInView({
    fetchNextPage,
    isLoading: isUnreadLoading,
  });
  
  // 전체 알림 목록 저장
  useEffect(() => {
    if (!data) return;
    const notificationList = data?.pages.flatMap((page) => page.items);
    setNotifications(notificationList);
  }, [data, setNotifications]);

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
        <Avatar
          imageSrc={user.profileImage ?? ''} //TODO 프로필 이미지 없는 경우 기본 이미지 설정 필요
          fallback={user.email.split('@')[0]}
          className="w-8 h-8 cursor-pointer"
        />
        {unreadCount}
       {unreadCount > 0 && <NotificationBadge /> }
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <h4>Notification</h4>
        {notifications?.map((notification: NotificationType) => (
          <NotificationItem 
            key={notification.id} 
            notification={notification}
            onClose={() => setIsOpen(false)}
          />
        ))}
        {hasNextPage && <div ref={ref} />}
      </PopoverContent>
    </Popover>
  );
};
