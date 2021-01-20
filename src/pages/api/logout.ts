import type { NextApiRequest, NextApiResponse } from 'next'

import cookie from 'cookie'
import ironStore from 'iron-store'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const store = await ironStore({
      password: process.env.NEXT_PUBLIC_STORE_PASSWORD
    })
    store.unset('session')
    store.clear()
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('seal', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/'
      })
    )
    res.redirect(307, '/login')
  } catch (error) {
    res.status(400).send(error)
  } finally {
    res.end()
  }
}
