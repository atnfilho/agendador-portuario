"use client";

import PatioForm from "@/components/forms/Patio";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function YardDetails({ params }: { params: { yardId: string } }) {
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
        return <PatioForm id={Number(params.yardId)} />
    }
}