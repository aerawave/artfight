"use server";

import { getCharacter } from "@/app/actions/data/characters/get";
import { Crumb, HomeCrumb } from "@/app/components/crumb";
import Navigation from "@/app/components/navigation";
import { notFound } from "next/navigation";
import React from "react";
import EditCharacterForm from "./components/edit-character-form";
import { getUser } from "@/app/actions/user";
import db from "@/data/db/database";
import { Images } from "@/data/db/schema";
import { eq } from "drizzle-orm";

export default async function EditCharacterPage(props: {
    params: {
        character_id: string;
        params?: {
            sender?: string;
        };
    };
    searchParams?: {
        sender?: string;
    };
}) {
    const local_crumbs: Crumb[] = [
        {
            label: "Manage Characters",
            href: "/manage/characters",
        },
    ];

    let character_id: string | number = props.params.character_id.trim();

    if (!character_id) {
        notFound();
    }

    character_id = Number(character_id);

    if (isNaN(character_id)) {
        notFound();
    }

    const character = await getCharacter(character_id);

    if (!character) {
        notFound();
    }

    const owner = await getUser(character.ownerId);

    if (!owner || !owner.username) {
        notFound();
    }

    const main_image = (
        await db.select().from(Images).where(eq(Images.id, character.imageId))
    )[0];

    if (!main_image) {
        notFound();
    }

    return (
        <>
            <Navigation crumbs={[HomeCrumb, ...local_crumbs]} />
            <div className="flex flex-col gap-4 m-4">
                <h1 className="text-4xl">Edit Character: {character.name}</h1>
                <div className="rounded-md bg-cyan-600 p-3 text-xl text-white m-2">
                    <p>
                        All fields with an asterisk need to be filled in. BBCode
                        can be used in text area fields.
                    </p>
                </div>
                <EditCharacterForm
                    owner={owner.username}
                    character={character}
                    mainImage={main_image}
                    sender={props.searchParams?.sender}
                />
            </div>
        </>
    );
}
