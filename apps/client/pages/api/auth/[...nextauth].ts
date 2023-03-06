import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { LoginOAuth } from "../../../relay/user/LoginOAuthMutation";
import { RelayEnvironment } from "../../../relay/RelayEnvironment";
import { commitMutation } from "../../../relay/commitMutation";
import jwt, { JwtPayload } from "jsonwebtoken";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          picture: profile.picture
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user, account }) => {
      const { id_token } = account;
      const response: any | string = await commitMutation(RelayEnvironment, {
        mutation: LoginOAuth,
        variables: { id_token }
      })
        .then((data: any) => {
          const { loginWithOAuth: { token } } = data;
          if (token) {
            account.accessToken = token;
            return true;
          }
          return '/auth/unauthorized';
        })
        .catch((err) => {
          return '/auth/unauthorized';
        })
      return response;
    },
    jwt: async ({ token, user, account }) => {
      if (user) {
        const { id, ...rest } = user;
        const payload = jwt.verify(String(account.accessToken), process.env.JWT_SECRET, { clockTimestamp: Math.floor(Date.now() / 1000) }) as JwtPayload;
        return { ...rest, sub: id, exp: payload.exp, accessToken: account.accessToken }
      }

      if (token && token.exp && Number(token?.exp) < Math.floor(Date.now() / 1000)) return {};

      return token;
    },
    session: async ({ session, token }) => {
      return {...session, accessToken: token.accessToken}
    }
  }
})