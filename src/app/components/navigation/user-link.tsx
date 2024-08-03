"use server";

import React from "react";

import NavLink, { NavLinkData } from "./nav-link";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import Icon from "../icon";
import { faBell } from "../icons";

export default async function UserLink() {
    const { userId } = auth();

    if (!userId) {
        return <div>invalid_user</div>;
    }

    const user = await clerkClient.users.getUser(userId);

    const notifications = 0;
    const nav_link: NavLinkData = {
        href: "",
        label: (
            <span className="flex flex-row items-center flex-grow">
                <Image
                    className="flex flex-row bg-rose-400 text-white rounded-full h-8 w-8 text-xs mr-2 justify-center items-center"
                    src={user.imageUrl}
                    alt="avatar"
                    width="48"
                    height="48"
                />
                <span>{user.username}</span>
            </span>
        ),
        subs: [
            { href: `/~${user.username}`, label: "Profile" },
            { href: "/user/settings", label: "Settings" },
            { href: "/team/sort", label: "Team Settings" },
            { href: "/reports", label: "Reports" },
            "divider",
            { label: "Manage" },
            { href: "/manage/characters", label: "Characters" },
            { href: "/manage/bookmarks", label: "Bookmarks" },
            { href: "/manage/attacks", label: "Attacks" },
            { href: "/manage/achievements", label: "Achievements" },
            "divider",
            {
                href: "",
                label: (
                    <>
                        <SignOutButton>Log out</SignOutButton>
                    </>
                ),
            },
        ],
    };
    return (
        <div className="flex flex-row items-center">
            <NavLink data={nav_link} className="mr-4" />
            <Link href="/">
                <Icon icon={notifications > 0 ? faBell.fas : faBell.far} />
            </Link>
        </div>
    );
}
