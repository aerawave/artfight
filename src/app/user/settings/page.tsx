"use server";

import React from "react";

import Navigation from "@/app/components/navigation";
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

    //await clerkClient.users.updateUser(userId, { password: "TestTest1412" });

    const local_crumbs: Crumb[] = [
        {
            label: "Settings",
            href: "/user/settings",
        },
    ];

    return (
        <>
            <Navigation crumbs={[HomeCrumb, ...local_crumbs]} />
            <Tabs tabs={tabs} />
        </>
    );
}
