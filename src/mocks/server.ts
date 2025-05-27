import { setupServer } from 'msw/node';
import { groupsHandlers } from './handler/groups';
import { notificationsHandlers } from './handler/notifications';
import { followingsHandlers } from './handler/followings';
import { authenticationsHandlers } from './handler/authentications';
import { repliesHandlers } from './handler/replies';

export const server = setupServer(
  ...groupsHandlers,
  ...notificationsHandlers,
  ...followingsHandlers,
  ...authenticationsHandlers,
  ...repliesHandlers
);
