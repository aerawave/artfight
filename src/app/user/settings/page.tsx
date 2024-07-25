"use server";

import React from "react";

import Navigation from "@/app/components/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import UserSettings from "./components/user-settings";
import { Breadcrumb } from "@/app/components/breadcrumb";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

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

    return (
        <>
            <Navigation />
            <div className="pt-8">
                <Breadcrumb className="rounded-md bg-gray-600 p-4 m-4 mt-0">
                    <Link href="/">
                        <FontAwesomeIcon icon={faHome} className="mr-2" />
                        <span>Home</span>
                    </Link>
                    <Link href="/user/settings">
                        <span>Settings</span>
                    </Link>
                </Breadcrumb>
                <TabGroup>
                    <TabList className="flex flex-row">
                        {settings_tabs.map((tab) => (
                            <Tab
                                key={tab.key}
                                className="rounded-t-sm border-2 border-b-0 border-transparent data-[selected]:border-white/50 hover:border-white/75 p-1 text-cyan-300/75 data-[selected]:text-white hover:text-cyan-300/50"
                            >
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
