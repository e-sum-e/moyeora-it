import { Avatar } from '../../atoms/avatar';
import { PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { NotificationItem } from '../../atoms/notification-item';
import { Popover } from "@/components/ui/popover";
import { useState, useEffect } from 'react';
import { Notification as NotificationType } from '@/types/index';
import useNotificationStore from '@/stores/useNotificationStore';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';

export const NotificationList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, setNotifications, setHasUnreadNotification } = useNotificationStore();

  // 전체 알림 목록 조회
  const { data, fetchNextPage, hasNextPage } = useFetchItems<NotificationType>({
    url: '/notifications',
  });

  // 안 읽은 알림 목록 조회
  const { data: unreadData } = useFetchItems<NotificationType>({
    url: '/notifications',
    queryParams: { isRead: 'false' },
  });

  const {ref} = useFetchInView({
    fetchNextPage
  });
  
  // 전체 알림 목록 저장
  useEffect(() => {
    if (!data) return;
    const notificationList = data?.pages.flatMap((page) => page.items);
    setNotifications(notificationList);
    const hasUnread = data.pages.some(page => page.items.length > 0);
    setHasUnreadNotification(hasUnread);
  }, [data, setHasUnreadNotification, setNotifications]);

  // 안 읽은 알림 여부 확인
  useEffect(() => {
    if (!unreadData) return;
    const hasUnread = unreadData.pages.some(page => page.items.length > 0);
    setHasUnreadNotification(hasUnread);
  }, [unreadData, setHasUnreadNotification]);

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger>
        <Avatar
          imageSrc="https://github.com/shadcn.png"
          fallback="user이름"
          className="w-8 h-8 cursor-pointer"
        />
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
