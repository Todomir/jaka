import { NextApiRequest } from 'next'

import cookie from 'cookie'
import { IncomingMessage } from 'http'

export function parseCookies(req: IncomingMessage): { [key: string]: string } {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie)
}
