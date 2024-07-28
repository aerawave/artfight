"use server";

import { getCharacter } from "@/app/actions/data/characters/character";
import { getUserByUsername } from "@/app/actions/user";
import { Crumb, HomeCrumb } from "@/app/components/crumb";
import Navigation from "@/app/components/navigation";
import Tabs, { TabData } from "@/app/components/tabs";
import { notFound } from "next/navigation";
import React from "react";
import CharacterProfileTab from "./components/profile-tab";
import CharacterAttacksTab from "./components/attacks-tab";

export default async function ViewCharacterPage(props: {
    params: { username: string; character_id: string | number; tab: string };
}) {
    const username = props.params.username;
    const character_id = Number(props.params.character_id);
    const tab = props.params.tab ?? "profile";

    if (isNaN(character_id)) {
        notFound();
    }

    const owner = await getUserByUsername(username);

    if (!owner) {
        notFound();
    }

    const character = await getCharacter(owner.id, character_id);
    if (!character) {
        notFound();
    }

    const local_crumbs: Crumb[] = [
        {
            href: `/users/${username}`,
            label: owner.username,
        },
        {
            href: `/users/${username}/characters`,
            label: "Characters",
        },
        {
            href: `/users/${username}/characters/${character.id}`,
            label: character.name,
        },
    ];

    const tab_props = { username, characterId: character_id };

    const tabs: TabData[] = [
        {
            key: "profile",
            label: "Profile",
            href: `${local_crumbs[2].href}`,
            content: <CharacterProfileTab {...tab_props} />,
        },
        {
            key: "attacks",
            label: "Attacks",
            href: `${local_crumbs[2].href}/attacks`,
            content: <CharacterAttacksTab {...tab_props} />,
        },
    ];

    return (
        <div>
            <Navigation crumbs={[HomeCrumb, ...local_crumbs]} />
            <Tabs tabs={tabs} activeTab={tab} />
        </div>
    );
}
