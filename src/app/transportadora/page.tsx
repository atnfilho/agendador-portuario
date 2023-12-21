'use client';

import TransporterList from "@/components/TransporterList";
import { useSession } from "next-auth/react";


export default function Home() {

    const { data: session }: any = useSession();

    if(session) {
        return (
            <TransporterList />
        )
    }
}



