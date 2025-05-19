import { setupServer } from 'msw/node'
import { groupsHandlers } from './handler/groups'

export const server = setupServer(...groupsHandlers)
