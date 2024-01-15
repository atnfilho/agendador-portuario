"use client";

import TransportadoraForm from "@/components/forms/Transportadora";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransporterDetails({ params }: { params: { transporterId: string } }) {
    const { data: session, status }: any = useSession();
    const router = useRouter();
    const [user, updateUser] = useState("");

    useEffect(() => {
        if (status === "authenticated" && !session?.roles.includes("Administrator")) {
            router.push("/unauthorized");
        }
        updateUser(session?.user.name);
    }, [session, router, status])


    if (session && session.roles.includes("Administrator")) {
        return <TransportadoraForm id={Number(params.transporterId)}/>
    }
}