import { setupWorker } from 'msw/browser';
import { groupsHandlers } from './handler/groups';
import { notificationsHandlers } from './handler/notifications';
import { repliesHandlers } from './handler/replies';

export const worker = setupWorker(
  ...groupsHandlers,
  ...notificationsHandlers,
  ...repliesHandlers,
);
