import { setupWorker } from 'msw/browser';
import { groupsHandlers } from './handler/groups';
import { notificationsHandlers } from './handler/notifications';

export const worker = setupWorker(...groupsHandlers, ...notificationsHandlers);
  
