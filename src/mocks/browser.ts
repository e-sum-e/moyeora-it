import { groupsHandlers } from './handler/groups';
import { setupWorker } from 'msw/browser';
import { notificationsHandlers } from './handler/notifications';

export const worker = setupWorker(...groupsHandlers, ...notificationsHandlers);
  
