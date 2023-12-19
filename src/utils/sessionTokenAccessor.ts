import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";
import { decrypt } from "./encryption";

export async function getAccessToken() {

    const session: any = await getServerSession(options);
    if (session) {
        const accessTokenDecrypted = decrypt(session.access_token)
        return accessTokenDecrypted;
    }
    return null;
}

export async function getIdToken() {

    const session: any = await getServerSession(options);
    if (session) {
        const idTokenDecrypted = decrypt(session.id_token)
        return idTokenDecrypted;
    }
    return null;
}