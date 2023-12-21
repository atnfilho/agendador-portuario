'use client';

import VehicleList from "@/components/VehicleList";
import { useSession } from "next-auth/react";


export default function Home() {

    const { data: session }: any = useSession();

    if(session) {
        return (
           <VehicleList />
        )
    }
}



