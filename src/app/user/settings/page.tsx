"use server";

import React from "react";

import Header from "@/app/components/header";
import { Crumb, HomeCrumb } from "@/app/components/crumb";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserSettings from "./components/user-settings";
import Tabs, { TabData } from "@/app/components/tabs";

export default async function UserSettingsPage() {
    const { userId } = auth();

    if (!userId) {
        redirect("/login");
    }

    const client = clerkClient();

    const user = await client.users.getUser(userId);

    const tabs: TabData[] = [
        {
            key: "user/site",
            label: "User / Site",
            content: <UserSettings user={user} />,
        },
    ];

    const local_crumbs: Crumb[] = [
        {
            label: "Settings",
            href: "/user/settings",
        },
    ];

    return (
        <>
            <Header crumbs={[HomeCrumb, ...local_crumbs]} />
            <Tabs tabs={tabs} />
        </>
    );
}
