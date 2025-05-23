import { setupServer } from 'msw/node';
import { groupsHandlers } from './handler/groups';
import { notificationsHandlers } from './handler/notifications';
import { repliesHandlers } from './handler/replies';

export const server = setupServer(
  ...groupsHandlers,
  ...notificationsHandlers,
  ...repliesHandlers,
);
