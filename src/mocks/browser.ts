import { groupsHandlers } from './handler/groups';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(...groupsHandlers);
