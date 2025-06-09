import { Notification } from '@/types/index';
import useNotificationStore from '@/stores/useNotificationStore';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const NotificationItem = ({ 
  notification,
  onClose,
}: { 
  notification: Notification;
  onClose?: () => void;
}) => {
  const { setReadNotification } = useNotificationStore();
  const router = useRouter();

  const handleClick = () => {
    // 읽음 처리
    setReadNotification(notification.id);
    
    // URL이 있는 경우 해당 페이지로 이동
    if (notification.url) {
      router.push(notification.url); 
      // 팝오버 닫기
      onClose?.();
    }
  };

  return (
    <div 
      className={`
        px-4 py-3 
        cursor-pointer 
        transition-colors duration-200
        hover:bg-gray-50 
        border-b border-gray-100
        ${notification.isRead ? 'bg-gray-50' : 'bg-white'}
      `}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-1">
        <p className={`text-sm ${notification.isRead ? 'text-gray-500' : 'text-gray-800'}`}>
          {notification.message}
        </p>
        <span className="text-xs text-gray-400">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: ko })}
        </span>
      </div>
      {!notification.isRead && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
        </div>
      )}
    </div>
  );
};