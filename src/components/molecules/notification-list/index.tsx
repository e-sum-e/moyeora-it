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

  const { data, fetchNextPage, hasNextPage } = useFetchItems({
    url: '/notifications',
    queryParams: { isRead: 'false' },
    enabled: isOpen,
  });

  const {ref} = useFetchInView({
    fetchNextPage
  });
  

  useEffect(() => {
    if (!data) return;
    const notificationList = data?.pages.flatMap((page) => page.items);
    setNotifications(notificationList);
    const hasUnread = data.pages.some(page => page.items.length > 0);
    setHasUnreadNotification(hasUnread);
  }, [data, setHasUnreadNotification, setNotifications]);

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
      <PopoverContent>
        <h4>Notification</h4>
        {notifications?.map((notification: NotificationType) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
        {hasNextPage && <div ref={ref} />}
      </PopoverContent>
    </Popover>
  );
};
