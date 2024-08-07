"use server";

import { Crumb, HomeCrumb } from "@/app/components/crumb";
import Header from "@/app/components/header";
import Tabs, { TabData } from "@/app/components/tabs";
import Link from "next/link";
import React from "react";
import ActiveCharacters from "./components/active-characters";
import ArchivedCharacters from "./components/archived-characters";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCharacters } from "@/app/actions/data/characters/character-list";
import { getUser } from "@/app/actions/user";
import { redirect } from "next/navigation";

export default async function ManageCharactersPage() {
    const { userId: clerkId } = auth();
    if (!clerkId) {
        redirect("/");
    }
    const { username } = await clerkClient().users.getUser(clerkId);
    if (!username) {
        redirect("/");
    }
    const { id: userId } = await getUser(clerkId);

    const characters = await getCharacters(userId);

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
            content: (
                <ActiveCharacters ownerUsername={username} data={characters} />
            ),
        },
        {
            key: "archived",
            label: "Archived Characters",
            content: <ArchivedCharacters />,
        },
    ];
    return (
        <>
            <Header crumbs={[HomeCrumb, ...local_crumbs]} />
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
