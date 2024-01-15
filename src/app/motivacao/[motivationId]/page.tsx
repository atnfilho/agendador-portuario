"use client";

import { MotivacaoForm } from "@/components/forms/Motivacao";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MotivationDetails({ params }: { params: { motivationId: string } }) {
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
        return <MotivacaoForm id={Number(params.motivationId)} />
    }
}