import { setupServer } from 'msw/node';
import { groupsHandlers } from './handler/groups';
import { notificationsHandlers } from './handler/notifications';


export const server = setupServer(...groupsHandlers, ...notificationsHandlers);
