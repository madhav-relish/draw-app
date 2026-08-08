'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createDemoRoom } from '@/draw/http';
import { Loading } from '@repo/ui';

export default function DemoPage() {
    const router = useRouter();

    useEffect(() => {
        const initDemo = async () => {
            // 1. Check if this device already has a saved guest room
            const existingSlug = localStorage.getItem('guestRoomSlug');
            if (existingSlug) {
                router.replace(`/canvas/${existingSlug}`);
                return;
            }

            // 2. If first time on this device, create one persistent demo room
            const roomData = await createDemoRoom();
            if (roomData?.slug) {
                localStorage.setItem('guestRoomSlug', roomData.slug);
                router.replace(`/canvas/${roomData.slug}`);
            } else if (roomData?.roomId) {
                localStorage.setItem('guestRoomSlug', String(roomData.roomId));
                router.replace(`/canvas/${roomData.roomId}`);
            } else {
                const fallbackSlug = "demo-" + Math.random().toString(36).substring(2, 9);
                localStorage.setItem('guestRoomSlug', fallbackSlug);
                router.replace(`/canvas/${fallbackSlug}`);
            }
        };

        initDemo();
    }, [router]);

    return <Loading fullPage label="Loading your personal whiteboard..." size="lg" />;
}

