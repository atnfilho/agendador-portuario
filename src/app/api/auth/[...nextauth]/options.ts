import { encrypt } from "@/utils/encryption";
import { jwtDecode } from "jwt-decode";
import type { NextAuthOptions } from "next-auth";
import KeyCloakProvider from "next-auth/providers/keycloak";



// this will refresh an expired access token, when needed
async function refreshAccessToken(token: any) {
    const resp = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: process.env.KEYCLOAK_CLIENT_ID as string,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET as string,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
        }),
        method: "POST",
    });
    const refreshToken = await resp.json();
    if (!resp.ok) throw refreshToken;

    return {
        ...token,
        access_token: refreshToken.access_token,
        decoded: jwtDecode(refreshToken.access_token),
        id_token: refreshToken.id_token,
        expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
        refresh_token: refreshToken.refresh_token,
    };
}



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
                // token is expired, try to refresh it
                console.log('Token has expired. Will refresh...');
                try {
                    const refreshedToken = await refreshAccessToken(token);
                    console.log("Token is refreshed.")
                    return refreshedToken;
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return { ...token, error: "RefreshAccessTokenError" };
                }
            }
            // return token;
        },
        async session({ session, token }: any) {
            // send properties to the client
            session.token_decoded = encrypt(token.decoded);
            session.access_token = token.access_token;
            session.id_token = encrypt(token.id_token);
            session.roles = token.decoded.realm_access.roles;
            session.error = token.error;
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET
}