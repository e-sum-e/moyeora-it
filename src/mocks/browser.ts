import { setupWorker } from 'msw/browser';
import { groupsHandlers } from './handler/groups';
import { notificationsHandlers } from './handler/notifications';
import { followHandlers } from './handler/follow';
import { authenticationsHandlers } from './handler/authentications';
import { repliesHandlers } from './handler/replies';
import { ratingHandlers } from './handler/rating';
import { userHandlers } from './handler/user';

export const worker = setupWorker(
  ...groupsHandlers,
  ...notificationsHandlers,
  ...followHandlers,
  ...authenticationsHandlers,
  ...repliesHandlers,
  ...ratingHandlers,
  ...userHandlers,
);
