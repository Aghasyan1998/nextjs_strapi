import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Missing username or password');
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ identifier: credentials.username, password: credentials.password }),
          cache: 'no-cache'
        })
        const response = await res.json()

        if (res.ok && response) {
          const { user, jwt } = response

          return {
            id: user.id,
            name: user.username,
            email: user.email,
            jwt
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.id = token.id;
      session.jwt = token.jwt;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
        token.jwt = user.jwt;
      }
      return Promise.resolve(token);
    },
  },
  pages: {
    signIn: '/details',
    signOut: "/login",
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET,
};
