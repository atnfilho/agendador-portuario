import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

export const withPermission = (Component: FC) => {

    const WithPermission = (props: any) => {

        const { data: session, status }: any = useSession();
        const router = useRouter();
        const [user, updateUser] = useState("");

        useEffect(() => {
            if (status === "authenticated" && !session?.roles.includes("Administrator")) {
                router.push("/unauthorized");
            }
            updateUser(session?.user.name);
        }, [session, router, status]);

        if (session && session.roles.includes("Administrator")) {
            return <Component  {...props} />
        }
    }

    return WithPermission;

}