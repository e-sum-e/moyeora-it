import { groupsHandlers } from './handler/groups';
import { setupServer } from 'msw/node';
import { notificationsHandlers } from './handler/notifications';

export const server = setupServer(...groupsHandlers, ...notificationsHandlers);
