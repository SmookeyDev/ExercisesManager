import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { LoginOAuth } from "../../../lib/relay/user/LoginOAuthMutation";
import { RelayEnvironment } from "../../../lib/relay/RelayEnvironment";
import { commitMutation } from "../../../lib/relay/commitMutation";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async (params) => {
      const { account: { id_token: token } } = params;

      const mutation = LoginOAuth as any;
      const variables = { token };

      const response: boolean | string = await commitMutation(RelayEnvironment, {
        mutation,
        variables
      })
        .then((data: any) => {
          const { loginWithOAuth: { me } } = data;
          if (me) return true;
          return '/auth/unauthorized';
        })
        .catch(() => {
          return '/auth/unauthorized';
        })

      return response;
    },
    jwt: async ({ token, account, profile }) => {
      if (account) token = { ...token, id_token: account.id_token };
      return token;
    },
    session: async ({ session, token }) => {
      return { ...session, user: { ...session.user, id_token: token.id_token } };
    }
  }
})