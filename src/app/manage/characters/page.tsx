"use server";

import { Crumb, HomeCrumb } from "@/app/components/crumb";
import Navigation from "@/app/components/navigation";
import Tabs, { TabData } from "@/app/components/tabs";
import Link from "next/link";
import React from "react";
import ActiveCharacters from "./components/active-characters";
import ArchivedCharacters from "./components/archived-characters";

export default async function ManageCharactersPage() {
    const local_crumbs: Crumb[] = [
        {
            label: "Manage Characters",
            href: "/manage/characters",
        },
    ];

    const tabs: TabData[] = [
        {
            key: "active",
            label: "Active Characters",
            content: <ActiveCharacters />,
        },
        {
            key: "archived",
            label: "Archived Characters",
            content: <ArchivedCharacters />,
        },
    ];
    return (
        <>
            <Navigation crumbs={[HomeCrumb, ...local_crumbs]} />
            <div className="p-4 pt-8">
                <div className="flex flex-row justify-between">
                    <h1 className="text-4xl font-bold">My Characters</h1>
                    <Link
                        className="rounded-md bg-cyan-600 p-3 text-xl text-white"
                        href="/submit/character"
                    >
                        Submit New Character
                    </Link>
                </div>
                <Tabs tabs={tabs} />
            </div>
        </>
    );
}
