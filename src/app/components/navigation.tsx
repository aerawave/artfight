"use server";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
            <div className="chip-indigo-emerald">new!</div>
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
                <div className="flex-row-2">
                    <span>Wormston Plush</span>
                    <div className="chip-blue">new!</div>
                    <div className="chip-red">limited!!</div>
                </div>
            ),
        },
        {
            href: "https://www.makeship.com/products/art-fight-werewolves-vs-vampires-enamel-pins",
            label: (
                <div className="flex-row-2">
                    <span>Vampires vs Werewolves Pins</span>
                    <div className="chip-blue">new!</div>
                    <div className="chip-red">limited!!</div>
                </div>
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
                <div className="flex-row-2">
                    <span>Tag Search</span>
                    <div className="chip-light-blue"></div>
                </div>
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
            <div className="navigation-bar">
                <nav>
                    <ul className="link-list">
                        <li>
                            <Link href="/" className="logo-link" shallow>
                                <Image
                                    alt="ArtFight"
                                    src="/assets/img/logos/logo40.png"
                                    width="40"
                                    height="40"
                                />
                                <span>Art Fight</span>
                            </Link>
                        </li>
                        <NavLink data={discord} />
                        <NavLink data={help} />
                        <NavLink data={shop} />
                    </ul>
                </nav>
                <ul className="link-list-end">
                    <SignedIn>
                        <UserLink />
                    </SignedIn>
                    <SignedOut>
                        <li>
                            <Link href="/login">Register / Log In</Link>
                        </li>
                    </SignedOut>
                </ul>
            </div>
            <Banner />
            {props.crumbs && (
                <div className="pt-8">
                    <Breadcrumb>
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
