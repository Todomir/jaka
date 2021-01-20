import type { NextApiRequest, NextApiResponse } from 'next'

import { LOGIN } from '@utils/queries'

import cookie from 'cookie'
import { GraphQLClient } from 'graphql-request'
import ironStore from 'iron-store'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL)
  const { email, password } = await JSON.parse(req.body)

  if (!email || !password) {
    res.status(400).send('Email and password must be provided.')
  }

  try {
    const { login } = await client.request(LOGIN, { email, password })

    if (login.user) {
      const store = await ironStore({
        password: process.env.NEXT_PUBLIC_STORE_PASSWORD
      })
      store.set('session', { user: login.user, token: login.token })
      const seal = await store.seal()

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('seal', seal, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 7 * 24 * 60 * 60,
          sameSite: 'strict',
          path: '/'
        })
      )
      res.redirect('/dashboard')
    } else {
      res.status(404).send('Username and password combination does not exist.')
    }
  } catch (error) {
    res.status(400).send(error)
  } finally {
    res.end()
  }
}
