'use client';


import ScheduleList from '@/components/ScheduleList';
import { useSession } from 'next-auth/react';


export default function Home() {

    const { data: session }: any = useSession();

    if (session) {
        return (
            <ScheduleList />
        )
    }
}
