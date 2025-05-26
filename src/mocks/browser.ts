import { setupWorker } from 'msw/browser';
import { groupsHandlers } from './handler/groups';
import { notificationsHandlers } from './handler/notifications';
import { repliesHandlers } from './handler/replies';
import { followingsHandlers } from './handler/followings';

export const worker = setupWorker(
  ...groupsHandlers,
  ...notificationsHandlers,
  ...followingsHandlers, 
  ...repliesHandlers
);
