import { setupWorker } from 'msw/browser'
import { groupsHandlers } from './handler/groups'

export const worker = setupWorker(...groupsHandlers)
