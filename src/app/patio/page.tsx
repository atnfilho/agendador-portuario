'use client';

import YardList from "@/components/YardList";
import { useSession } from 'next-auth/react';

export default function Home() {

    const { data: session }: any = useSession();

    if (session) {
        return (
            <YardList />
        )
    }
}


