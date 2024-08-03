import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <TooltipProvider>
                <html lang="en">
                    <head>
                        {/* FIXME: Temporary solution */}
                        <link
                            rel="stylesheet"
                            href="/font-awesome/css/all.min.css"
                        />
                    </head>
                    <body className={inter.className}>{children}</body>
                </html>
            </TooltipProvider>
        </ClerkProvider>
    );
}
