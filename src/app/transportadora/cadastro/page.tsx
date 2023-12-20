"use client";

import TransportadoraForm from "@/components/forms/Transportadora";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

    const { data: session, status }: any = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated" ||
            (status === "authenticated" && !session?.roles.includes("Administrator"))) {
            router.push("/unauthorized");
        }
    }, [session, router, status])


    if (status === "loading") {
        return <></>
    }

    if (session && session.roles.includes("Administrator")) {
        return (
            <>
                <TransportadoraForm />
            </>
        )
    }


}