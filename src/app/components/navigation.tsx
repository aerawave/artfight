"use server";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Chip from "./chip";
import NavLink, { NavLinkData } from "./navigation/nav-link";
import Banner from "./navigation/banner";
import UserLink from "./navigation/user-link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Breadcrumb } from "./breadcrumb";
import { Crumb } from "./crumb";
import Icon from "./icon";
import {
    faDiscord,
    faMagnifyingGlass,
    faPlus,
    faQuestionCircle,
    faShoppingCart,
} from "./icons";

const discord: NavLinkData = {
    href: "https://discord.gg/artfight",
    label: "Discord",
    icon: faDiscord.fab,
};

const help: NavLinkData = {
    label: "Help",
    icon: faQuestionCircle.fas,
    subs: [
        { label: "INFO" },
        { href: "/info/about", label: "About" },
        { href: "/info/rules", label: "Rules" },
        { href: "/info/faq", label: "FAQ" },
        { href: "/info/changelog", label: "Changelog" },
        { href: "/info/art-assets", label: "Art Assets" },
        "divider",
        { label: "GUIDES" },
        { href: "/guide/attacks", label: "Attack Categorization" },
        { href: "/guide/filters", label: "Filtering Guide" },
        { href: "/guide/bbcode", label: "BBCode" },
        "divider",
        { href: "/news", label: "News" },
    ],
};

const shop: NavLinkData = {
    label: (
        <>
            <span>Shop</span>
            <Chip className="bg-gradient-to-r from-indigo-500 to-emerald-300 ml-1">
                new!
            </Chip>
        </>
    ),
    icon: faShoppingCart.fas,
    subs: [
        { href: "/donate", label: "Support Art Fight" },
        "divider",
        { href: "https://shop.artfight.net/", label: "Merch" },
        {
            href: "https://www.makeship.com/products/art-fight-wormston-plush",
            label: (
                <>
                    <span>Wormston Plush</span>
                    <Chip className="ml-2 bg-blue-500">new!</Chip>
                    <Chip className="ml-2 bg-red-500">limited!!</Chip>
                </>
            ),
        },
        {
            href: "https://www.makeship.com/products/art-fight-werewolves-vs-vampires-enamel-pins",
            label: (
                <>
                    <span>Vampires vs Werewolves Pins</span>
                    <Chip className="ml-2 bg-blue-500">new!</Chip>
                    <Chip className="ml-2 bg-red-500">limited!!</Chip>
                </>
            ),
        },
    ],
};

const browse: NavLinkData = {
    label: "Browse",
    icon: faMagnifyingGlass.fas,
    subs: [
        { href: "/rate", label: "Rate Attacks" },
        "divider",
        { label: "Browse" },
        { href: "/members", label: "Members" },
        { href: "/attacks", label: "Attacks" },
        { href: "/characters", label: "Characters" },
        { href: "/character/random", label: "Random Character" },
        { href: "/user/random", label: "Random User" },
        {
            href: "/browse/tags",
            label: (
                <>
                    <span>Tag Search</span>
                    <Chip className="ml-1 bg-blue-400">new</Chip>
                </>
            ),
        },
    ],
};

const submit: NavLinkData = {
    label: "Submit",
    icon: faPlus.fas,
    subs: [{ href: "/submit/character", label: "Character" }],
};

type NavigationProps = {
    user?: string;
    crumbs?: Crumb[];
};

export default async function Navigation(props: NavigationProps) {
    const links: NavLinkData[] = [discord, help, shop];

    if (props.user) {
        links.push(browse, submit);
    }

    return (
        <>
            <nav className="bg-gray-800 px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center py-2">
                <div className="flex flex-row gap-8">
                    <Link
                        href="/"
                        className="flex lfex-row items-center"
                        shallow
                    >
                        <Image
                            alt="ArtFight"
                            src="/assets/img/logos/logo40.png"
                            className="h-8 w-8"
                            width="40"
                            height="40"
                        />
                        <span className="uppercase ml-2 text-1xl">
                            Art Fight
                        </span>
                    </Link>
                    {links.map((link, i) => (
                        <NavLink key={i} data={link} />
                    ))}
                </div>
                <div className="hidden md:flex flex-row">
                    <SignedIn>
                        <UserLink />
                    </SignedIn>
                    <SignedOut>
                        <Link href="/login">Register / Log In</Link>
                    </SignedOut>
                </div>
            </nav>
            <Banner />
            {props.crumbs && (
                <div className="pt-8">
                    <Breadcrumb className="rounded-md bg-gray-600 p-4 m-4 mt-0">
                        {props.crumbs.map((crumb, i) => (
                            <Link
                                key={i}
                                className="highlight"
                                href={crumb.href}
                            >
                                {crumb.icon && (
                                    <Icon icon={crumb.icon} className="mr-2" />
                                )}
                                {crumb.label}
                            </Link>
                        ))}
                    </Breadcrumb>
                </div>
            )}
        </>
    );
}
