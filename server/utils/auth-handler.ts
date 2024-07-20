import { H3Event, EventHandlerRequest } from 'h3'

export function readAuth(event: H3Event<EventHandlerRequest>) {
  const userId = event.context.auth?.user as string | undefined

  if (!userId)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  return userId
}