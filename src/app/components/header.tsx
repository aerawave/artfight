"use server";

import React from "react";
import Link from "next/link";
import Banner from "./navigation/banner";
import { Breadcrumb } from "./breadcrumb";
import { Crumb } from "./crumb";
import Icon from "./icon";
import { ThemeType, ThemeValues } from "../contexts/theming";
import { getUser, getUserProperty, updateUserProperty } from "../actions/user";
import { auth, clerkClient, User } from "@clerk/nextjs/server";

import "./styles/header.css";
import Navigation from "./navigation/navigation";

type HeaderProps = {
    crumbs?: Crumb[];
};

export default async function Header(props: HeaderProps) {
    let user_id: number | null = null;
    const { userId: clerk_id } = auth();

    let user: User | null = null;

    if (clerk_id) {
        user_id = (await getUser(clerk_id)).id;
        user = await clerkClient().users.getUser(clerk_id);
    }

    const user_profile = user
        ? {
              imageUrl: user.imageUrl,
              username: user.username!,
          }
        : null;

    const authenticated = typeof user_id === "number";

    let initial_theme = user_id
        ? ((await getUserProperty(user_id, "site_theme")) as ThemeType)
        : null;

    if (!initial_theme || !ThemeValues.includes(initial_theme)) {
        initial_theme = null;
    }

    const onThemeChange = async (theme: ThemeType) => {
        "use server";
        if (user_id) {
            await updateUserProperty(user_id, "site_theme", theme);
        }
    };

    return (
        <header>
            <Navigation
                authenticated={authenticated}
                onThemeChange={onThemeChange}
                initialTheme={initial_theme}
                userProfile={user_profile}
            />
            <Banner />
            {props.crumbs && (
                <nav className="pt-8">
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
                </nav>
            )}
        </header>
    );
}
