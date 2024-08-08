"use client";

import { useScreenSize } from "@/app/contexts/sizing";
import React, { Children } from "react";
import NavLink, { NavLinkData } from "./nav-link";
import Link from "next/link";
import ThemeSwitch from "../theme-switch";
import Image from "next/image";
import Chip from "../chip";
import {
    faDiscord,
    faQuestionCircle,
    faShoppingCart,
    faMagnifyingGlass,
    faPlus,
    faBars,
} from "../icons";
import { ThemeType } from "@/app/contexts/theming";
import UserLink from "./user-link";

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
        {
            label: "Test",
            subs: [
                {
                    label: "Test",
                    subs: [
                        { label: "Test", subs: [{ label: "Test", subs: [] }] },
                    ],
                },
            ],
        },
        {
            label: "Test",
            subs: [
                {
                    label: "Test",
                    subs: [
                        { label: "Test", subs: [{ label: "Test", subs: [] }] },
                    ],
                },
            ],
        },
    ],
};

const shop: NavLinkData = {
    label: (
        <>
            <span>Shop</span>
            <Chip variant="custom:indigo-emerald">new!</Chip>
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
                    <Chip variant="info">new!</Chip>
                    <Chip variant="danger">limited!!</Chip>
                </div>
            ),
        },
        {
            href: "https://www.makeship.com/products/art-fight-werewolves-vs-vampires-enamel-pins",
            label: (
                <div className="flex-row-2">
                    <span>Vampires vs Werewolves Pins</span>
                    <Chip variant="info">new!</Chip>
                    <Chip variant="danger">limited!!</Chip>
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
                    <Chip variant="info light">new!</Chip>
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
    authenticated: boolean;
    onThemeChange: (theme: ThemeType) => Promise<void>;
    initialTheme: ThemeType | null;
    userProfile: { imageUrl: string; username: string } | null;
};

export default function Navigation(props: NavigationProps) {
    const screen_size = useScreenSize();
    const xl = screen_size >= 4;

    const links: NavLinkData[] = [discord, help, shop];

    const user_links: NavLinkData[] = props.authenticated
        ? [browse, submit]
        : [];

    const logo_link = (
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
    );

    const main_nav: React.ReactNode[] = [];
    const sub_nav: React.ReactNode[] = [];

    if (xl) {
        main_nav.push(logo_link);
        for (const link of links) {
            main_nav.push(<NavLink data={link} isDropdown />);
        }
        for (const link of user_links) {
            main_nav.push(<NavLink data={link} isDropdown />);
        }
    } else {
        const menu: NavLinkData = {
            icon: faBars.fas,
            label: <span className="menu-button">Art Fight</span>,
            subs: links,
        };
        main_nav.push(<NavLink className="text-2xl" data={menu} noCaret />);
        main_nav.push(logo_link);
        for (const link of user_links) {
            sub_nav.push(<NavLink data={link} noCaret />);
        }
    }

    return (
        <div className="navigation-bar">
            <div>
                <nav>
                    <ul className="link-list">
                        {Children.map(main_nav, (e) => e)}
                    </ul>
                </nav>
                <ul className="link-list-end">
                    <li>
                        <ThemeSwitch
                            onThemeChange={props.onThemeChange}
                            defaultTheme={props.initialTheme}
                            allowSave={props.authenticated}
                        />
                    </li>
                    {xl &&
                        (props.userProfile ? (
                            <UserLink
                                imageUrl={props.userProfile.imageUrl}
                                username={props.userProfile.username}
                                isDropdown
                            />
                        ) : (
                            <li>
                                <Link href="/login">Sign in</Link>
                            </li>
                        ))}
                </ul>
            </div>
            {!xl && (
                <div>
                    <nav>
                        <ul className="link-list">
                            {Children.map(sub_nav, (e) => e)}
                        </ul>
                    </nav>
                    <ul className="link-list-end">
                        {props.userProfile ? (
                            <UserLink
                                imageUrl={props.userProfile.imageUrl}
                                username={props.userProfile.username}
                                noCaret
                            />
                        ) : (
                            <Link href="/login">Sign in</Link>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
