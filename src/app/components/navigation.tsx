"use client";
import React from "react";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Chip from "./chip";
import NavLink, { NavLinkData } from "./nav-link";

type NavLink = {
    href: string;
    label: React.ReactNode;
    icon?: IconProp;
    subs?: NavLink[];
};

const links: NavLinkData[] = [
    {
        href: "/",
        label: "Discord",
        icon: faDiscord,
    },
    {
        href: "/",
        label: "Help",
        icon: faQuestionCircle,
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
    },
    {
        href: "/",
        label: (
            <>
                <span>Shop</span>
                <Chip className="bg-gradient-to-r from-indigo-500 to-emerald-300 ml-1">
                    new!
                </Chip>
            </>
        ),
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
    },
];

export default function Navigation() {
    return (
        <Disclosure as="nav" className="bg-gray-800 px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex flex-row items-center">
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
                    </div>
                    <div className="hidden md:block ml-8">
                        {links.map((link, i) => (
                            <NavLink key={i} data={link} className="ml-8" />
                        ))}
                    </div>
                </div>
                <div className="hidden md:block">
                    <Link href="/register" className="m-4">
                        Register
                    </Link>
                    <Link href="/login" className="m-4">
                        Log In
                    </Link>
                </div>
            </div>
        </Disclosure>
    );
}
