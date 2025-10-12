import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { AuthOptions } from 'next-auth'
import PrismaClient from './prisma'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(PrismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = { ...session.user, id: user.id } as {
        id: string
        name: string
        email: string
      }

      return session
    },

    async signIn({ user, account, profile }) {
      // Verifica se já existe um user com o mesmo e-mail
      const existingUser = await PrismaClient.user.findUnique({
        where: { email: user.email ?? undefined },
      })

      if (existingUser && account?.provider && account?.providerAccountId) {
        // Faz o upsert da conta OAuth
        await PrismaClient.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          update: {},
          create: {
            userId: existingUser.id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            expiresAt: account.expires_at,
            tokenType: account.token_type,
            scope: account.scope,
            idToken: account.id_token,
          },
        })
      }

      return true
    },
  },
}
