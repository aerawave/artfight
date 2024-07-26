"use server";

import React from "react";

import Navigation from "@/app/components/navigation";
import { Crumb, HomeCrumb } from "@/app/components/crumb";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import UserSettings from "./components/user-settings";

type SettingsTab = {
    icon?: IconProp;
    key: string;
    label: React.ReactNode;
    content: React.ReactNode;
};

export default async function UserSettingsPage() {
    const { userId } = auth();

    if (!userId) {
        redirect("/login");
    }

    const client = clerkClient();

    const user = await client.users.getUser(userId);

    const settings_tabs: SettingsTab[] = [
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
            <div className="pt-8">
                <TabGroup>
                    <TabList className="tab-list">
                        {settings_tabs.map((tab) => (
                            <Tab key={tab.key} className="tab">
                                {tab.label}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels className="mt-3">
                        {settings_tabs.map((tab) => (
                            <TabPanel key={tab.key}>{tab.content}</TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
            </div>
        </>
    );
}
