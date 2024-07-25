"use server";

import React from "react";

import NavLink, { NavLinkData } from "./nav-link";
import { faBell as faBellRegular } from "@fortawesome/free-regular-svg-icons";
import { faBell as faBellSolid } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SignOutButton } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";

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
                <span className="ml-2">{user.username}</span>
            </span>
        ),
        subs: [
            { href: `/~${user.username}`, label: "Profile" },
            { href: "/user/settings", label: "Settings" },
            { href: "/", label: "Team Settings" },
            { href: "/", label: "Reports" },
            "divider",
            { label: "Manage" },
            { href: "/", label: "Characters" },
            { href: "/", label: "Bookmarks" },
            { href: "/", label: "Attacks" },
            { href: "/", label: "Achievements" },
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
                <FontAwesomeIcon
                    icon={notifications > 0 ? faBellSolid : faBellRegular}
                />
            </Link>
        </div>
    );
}
