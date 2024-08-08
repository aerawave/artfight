"use client";

import React from "react";

import NavLink, { NavLinkData } from "./nav-link";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import Icon from "../icon";
import { faBell } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

type UserLinkProps = {
    imageUrl: string;
    username: string;
    isDropdown?: boolean;
    noCaret?: boolean;
};

export default function UserLink(props: UserLinkProps) {
    const notifications = 0;
    const nav_link: NavLinkData = {
        href: "",
        label: (
            <span className="user-link">
                <Avatar className="avatar">
                    <AvatarImage
                        src={props.imageUrl}
                        alt={props.username ?? ""}
                    />
                    <AvatarFallback>
                        {props.username
                            ?.split(" ")
                            .map((w) => w.charAt(0).toUpperCase())
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <span>{props.username}</span>
            </span>
        ),
        subs: [
            { href: `/~${props.username}`, label: "Profile" },
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
            <li>
                <Link href="/">
                    <Icon icon={notifications > 0 ? faBell.fas : faBell.far} />
                </Link>
            </li>
            <NavLink
                data={nav_link}
                isDropdown={props.isDropdown}
                noCaret={props.noCaret}
            />
        </>
    );
}
