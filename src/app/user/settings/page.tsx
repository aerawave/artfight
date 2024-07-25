"use server";

import React from "react";

import Navigation from "@/app/components/navigation";
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
            label: "User/Site",
            content: <UserSettings user={user} />,
        },
    ];

    //await clerkClient.users.updateUser(userId, { password: "TestTest1412" });

    return (
        <>
            <Navigation />
            <div className="flex flex-col justify-center items-center pt-8">
                <TabGroup>
                    <TabList className="flex gap-4">
                        {settings_tabs.map((tab) => (
                            <Tab
                                key={tab.key}
                                className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                            >
                                {tab.label}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels className="mt-3">
                        {settings_tabs.map((tab) => (
                            <TabPanel
                                key={tab.key}
                                className="rounded-xl bg-white/5"
                            >
                                {tab.content}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
            </div>
        </>
    );
}
