import { Notification  } from '@/types/index';

export const NotificationItem = ({ notification }: { notification: Notification }) => {
  return (
    <div>
      <p>{notification.message}</p>
    </div>
  )
}