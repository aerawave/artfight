import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/font-awesome/css/all.min.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeType, ThemeValues } from "./contexts/theming";
import { auth } from "@clerk/nextjs/server";
import { getUserProperty } from "./actions/user";
import { clsx } from "./util";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId: clerk_id } = auth();

    let theme = clerk_id
        ? ((await getUserProperty(clerk_id, "site_theme")) as ThemeType)
        : null;

    if (!theme || !ThemeValues.includes(theme)) {
        theme = null;
    }

    return (
        <ClerkProvider>
            <TooltipProvider>
                <html lang="en">
                    <body className={clsx(inter.className, theme)}>
                        {children}
                    </body>
                </html>
            </TooltipProvider>
        </ClerkProvider>
    );
}
