import { encrypt } from "@/utils/encryption";
import { jwtDecode } from "jwt-decode";
import type { NextAuthOptions } from "next-auth";
import KeyCloakProvider from "next-auth/providers/keycloak";


export const options: NextAuthOptions = {
    providers: [

        KeyCloakProvider({
            clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
            clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
            issuer: `${process.env.KEYCLOAK_ISSUER}`,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {

            const nowTimestamp = Math.floor(Date.now() / 1000);

            if (account) {
                token.decoded = jwtDecode(account.access_token as string);
                token.access_token = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                return token;
            } else if (nowTimestamp < Number(token.expires_at)) {
                // token has not expired yet, return it
                return token;
            } else {
                console.log('Token has expired. Will refresh...');
            }
            return token;
        },
        async session({ session, token }: any) {
            // send properties to the client
            session.token_decoded = encrypt(token.decoded);
            session.access_token = token.access_token;
            session.id_token = encrypt(token.id_token);
            session.roles = token.decoded.realm_access.roles;
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET
}