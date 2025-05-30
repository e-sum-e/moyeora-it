import { setupServer } from 'msw/node';
import { groupsHandlers } from './handler/groups';
import { notificationsHandlers } from './handler/notifications';
import { followHandlers } from './handler/follow';
import { authenticationsHandlers } from './handler/authentications';
import { repliesHandlers } from './handler/replies';
import { userHandlers } from './handler/user';
import { ratingHandlers } from './handler/rating';

export const server = setupServer(
  ...groupsHandlers,
  ...notificationsHandlers,
  ...followHandlers,
  ...authenticationsHandlers,
  ...repliesHandlers,
  ...userHandlers,
  ...ratingHandlers,
);
