"use client";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "./globals.css";
const { chains, publicClient } = configureChains(
    [hardhat, sepolia],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "Alyra - Project 3",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains,
});

const wagmiConfig = createConfig({
    autoConnect: false,
    connectors,
    publicClient,
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <WagmiConfig config={wagmiConfig}>
                    <RainbowKitProvider chains={chains}>
                        {children}
                    </RainbowKitProvider>
                </WagmiConfig>
            </body>
        </html>
    );
}
