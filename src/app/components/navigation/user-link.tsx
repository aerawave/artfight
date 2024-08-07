"use server";

import React from "react";

import NavLink, { NavLinkData } from "./nav-link";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import Icon from "../icon";
import { faBell } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

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
            <span className="flex flex-row items-center flex-grow gap-2">
                <Avatar className="avatar">
                    <AvatarImage
                        src={user.imageUrl}
                        alt={user.username ?? ""}
                    />
                    <AvatarFallback>
                        {user.username
                            ?.split(" ")
                            .map((w) => w.charAt(0).toUpperCase())
                            .join("")}
                    </AvatarFallback>
                </Avatar>
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
        <>
            <NavLink data={nav_link} />
            <li>
                <Link href="/">
                    <Icon icon={notifications > 0 ? faBell.fas : faBell.far} />
                </Link>
            </li>
        </>
    );
}
