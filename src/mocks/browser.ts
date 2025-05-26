import { setupWorker } from 'msw/browser';
import { groupsHandlers } from './handler/groups';
import { notificationsHandlers } from './handler/notifications';
import { followingsHandlers } from './handler/followings';
import { authenticationsHandlers } from '@/mocks/handler/authentications';

export const worker = setupWorker(
  ...groupsHandlers,
  ...notificationsHandlers,
  ...followingsHandlers,
  ...authenticationsHandlers,
);
