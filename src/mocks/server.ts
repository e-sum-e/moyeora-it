import { groupsHandlers } from './handler/groups';
import { setupServer } from 'msw/node';

export const server = setupServer(...groupsHandlers);
