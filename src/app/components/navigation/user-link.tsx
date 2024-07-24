"use client";

import React from "react";

import NavLink, { NavLinkData } from "./nav-link";
import { faBell as faBellRegular } from "@fortawesome/free-regular-svg-icons";
import { faBell as faBellSolid } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type UserLinkProps = {
    user: string;
};

export default function UserLink(props: UserLinkProps) {
    const notifications = 0;
    const nav_link: NavLinkData = {
        href: `/~${props.user}`,
        label: (
            <span className="flex flex-row items-center flex-grow">
                <span className="flex flex-row bg-rose-400 text-white rounded-full h-8 w-8 text-xs mr-2 justify-center items-center">
                    A
                </span>
                {props.user}
            </span>
        ),
        subs: [
            { href: "/", label: "Profile" },
            { href: "/", label: "Settings" },
            { href: "/", label: "Team Settings" },
            { href: "/", label: "Reports" },
            "divider",
            { label: "Manage" },
            { href: "/", label: "Characters" },
            { href: "/", label: "Bookmarks" },
            { href: "/", label: "Attacks" },
            { href: "/", label: "Achievements" },
            "divider",
            { href: "/", label: "Logout" },
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
