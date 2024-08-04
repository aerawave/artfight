"use server";

import { getCharacter } from "@/app/actions/data/characters/get";
import { getUser } from "@/app/actions/user";
import { Crumb, HomeCrumb } from "@/app/components/crumb";
import Navigation from "@/app/components/navigation";
import Tabs, { TabData } from "@/app/components/tabs";
import { notFound } from "next/navigation";
import React from "react";
import CharacterProfileTab from "./components/profile-tab";
import CharacterAttacksTab from "./components/attacks-tab";
import Icon from "@/app/components/icon";
import { faPencil } from "@/app/components/icons";

export default async function ViewCharacterPage(props: {
    params: { username: string; character_id: string | number; tab: string };
}) {
    const username = props.params.username;
    const character_id = Number(props.params.character_id);
    const tab = props.params.tab ?? "profile";

    if (isNaN(character_id)) {
        notFound();
    }

    const character = await getCharacter(character_id);
    if (!character) {
        notFound();
    }

    const owner = await getUser(character.ownerId);

    if (!owner) {
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
            <div className="flex flex-row justify-end mx-4 gap-4">
                <a
                    href={`/edit/character/${
                        character.id
                    }?sender=${encodeURIComponent(local_crumbs[2].href)}`}
                    className="button-blue"
                >
                    <Icon icon={faPencil.fas} />
                    <span>Edit</span>
                </a>
            </div>
            <Tabs tabs={tabs} activeTab={tab} />
        </div>
    );
}
