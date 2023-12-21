'use client';


import ScheduleList from '@/components/ScheduleList';
import { useSession } from 'next-auth/react';


// unauthenticated
// mostra página inicial

// loading
// mostra página inicial

// authenticated
// mostra menu completo



export default function Home() {

    const { data: session }: any = useSession();

    if (session) {
        return (
            <ScheduleList />
        )
    }
}
