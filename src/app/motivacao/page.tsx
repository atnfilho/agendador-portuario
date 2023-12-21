'use client';

import MotivationList from '@/components/MotivationList';
import { useSession } from 'next-auth/react';

export default function Home() {

    const { data: session }: any = useSession();

    if (session) {
        return (
            <MotivationList />
        )

    }
}


