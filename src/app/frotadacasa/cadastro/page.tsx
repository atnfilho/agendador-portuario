"use client";

import FrotaDaCasaForm from "@/components/forms/FrotaDaCasa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function CadastroFrotaDaCasa() {

    const { data: session, status }: any = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && !session?.roles.includes("Administrator")) {
            router.push("/unauthorized");
        }
    }, [session, router, status])


    if (session && session.roles.includes("Administrator")) {
        return <FrotaDaCasaForm />
    }

}


export default CadastroFrotaDaCasa;