import { Notification } from '@/types/index';
import useNotificationStore from '@/stores/useNotificationStore';
import { useRouter } from 'next/navigation';

export const NotificationItem = ({ 
  notification,
  onClose,
}: { 
  notification: Notification;
  onClose?: () => void;
}) => {
  const { setReadNotifications } = useNotificationStore();
  const router = useRouter();

  const handleClick = () => {
    // 읽음 처리
    setReadNotifications(notification.id);
    
    // URL이 있는 경우 해당 페이지로 이동
    if (notification.url) {
      router.push(notification.url); 
      // 팝오버 닫기
      onClose?.();
    }
  };

  return (
    <div 
      className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${notification.isRead ? 'bg-gray-100' : 'bg-white'}`}
      onClick={handleClick}
    >
      <p>{notification.message}</p>
    </div>
  );
};