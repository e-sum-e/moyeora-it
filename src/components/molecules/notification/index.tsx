import { Avatar } from '../../atoms/avatar';
import { PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { NotificationItem } from '../../atoms/notification-item';
import { Popover } from "@/components/ui/popover";
import { request } from '@/api/request';
import { useState } from 'react';
import { Notification as NotificationType } from '@/types/index';
import { useQuery } from '@tanstack/react-query';

export const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const data = await request.get('/notifications');
      return data.items;
    },
    enabled: isOpen, // Popover가 열릴 때만 쿼리 실행
    staleTime: 1000 * 60, // 1분 동안 캐시 유지
  });

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
        {notifications.map((notification: NotificationType) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </PopoverContent>
    </Popover>
  );
};
