"use server";

import { getCharacter } from "@/app/actions/data/characters/get";
import { Crumb, HomeCrumb } from "@/app/components/crumb";
import Navigation from "@/app/components/navigation";
import { notFound, redirect } from "next/navigation";
import React from "react";
import EditCharacterForm from "./components/edit-character-form";
import { getUser } from "@/app/actions/user";
import db from "@/data/db/database";
import { Images } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import DeleteCharacterButton from "./components/delete-character-button";
import { requestDeleteCharacter } from "@/app/actions/data/characters/delete";
import { tryRedirect } from "@/app/util";
import Alert from "@/app/components/alert";

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

    const deleteCharacter = async () => {
        "use server";
        await requestDeleteCharacter(character.id);

        const sender = props.searchParams?.sender;
        const destination = "/manage/characters";
        if (sender === `/users/${owner.username}/characters/${character.id}`) {
            redirect(destination);
        } else {
            tryRedirect({
                url: sender,
                backup: "/manage/characters",
            });
        }
    };

    return (
        <>
            <Navigation crumbs={[HomeCrumb, ...local_crumbs]} />
            <div className="flex flex-col gap-4 m-4">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-4xl">
                        Edit Character: {character.name}
                    </h1>
                    <div className="flex flex-row gap-1">
                        <DeleteCharacterButton
                            characterName={character.name}
                            onConfirm={deleteCharacter}
                        />
                    </div>
                </div>
                <Alert variant="info">
                    <p>
                        All fields with an asterisk need to be filled in. BBCode
                        can be used in text area fields.
                    </p>
                </Alert>
                <EditCharacterForm
                    owner={owner.username}
                    character={character}
                    mainImage={main_image}
                />
            </div>
        </>
    );
}
