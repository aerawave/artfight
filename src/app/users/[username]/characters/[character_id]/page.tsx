"use server";

import { getCharacter } from "@/app/actions/data/characters/character";
import { getUserByUsername } from "@/app/actions/user";
import { Crumb, HomeCrumb } from "@/app/components/crumb";
import Navigation from "@/app/components/navigation";
import { notFound } from "next/navigation";
import React from "react";

export default async function ViewCharacterPage(props: {
    params: { username: string; character_id: string | number };
}) {
    const username = props.params.username;
    const character_id = Number(props.params.character_id);

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

    return (
        <div>
            <Navigation crumbs={[HomeCrumb, ...local_crumbs]} />
            <div>character: {character.name}</div>
        </div>
    );
}

/*
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    { params }: { params: { user: string; character: string } }
) {
    return NextResponse.json({
        user: params.user,
        character: params.character,
    });
}

*/
