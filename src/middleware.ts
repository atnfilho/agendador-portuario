
import { JWT } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";


export default withAuth(
    async (req: NextRequest & { nextauth: { token: JWT | null } }) => {


        if (req.nextUrl.pathname.startsWith('/auth') || req.nextUrl.pathname.startsWith('/_next')) {
            return NextResponse.next();
        }

        if (!req.nextauth.token) {
            const loginUrl = new URL("/auth/signin", req.url)
            loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
            return NextResponse.redirect(loginUrl)
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized() {
                return true
            },
        },

    }
);

