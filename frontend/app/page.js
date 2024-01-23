'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24 font-mono'>
            <div className='z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex'>
                <h1>Alyra - Project 3</h1>
                <ConnectButton />
            </div>
        </main>
    );
}
