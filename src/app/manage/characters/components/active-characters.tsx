"use server";

import React from "react";
import { getCharacters } from "@/app/actions/data/characters/character-list";
import CharacterPresenter from "@/app/components/characters/character-presenter";
import Alert from "@/app/components/alert";

type ActiveCharactersProps = {
    ownerUsername: string;
    data: Awaited<ReturnType<typeof getCharacters>>;
};

export default async function ActiveCharacters(props: ActiveCharactersProps) {
    return (
        <div>
            <Alert variant="info">
                <p>
                    This is your active character roster - these are the
                    characters that will show on your profile and other users
                    will be able to attack them during an event. You are limited
                    to <strong>100 active characters</strong> at any given time.
                </p>
                <p>
                    Characters may also be hidden, which will hide them from
                    your profile and other users, but retain all of their
                    profile information. Hidden characters still count towad
                    your active character total.
                </p>
                <p className="pt-2">
                    To reduce your active character total, you can archive ro
                    permanently delete characters.
                </p>
                <p>
                    Note that archived characters retain some information on
                    site and may later be restored to your active roster, while
                    deleted characters will retain no information and will need
                    to be re-uploaded as a new character if you wish to use them
                    again.
                </p>
            </Alert>
            <h1 className="text-4xl pb-2 border-b border-b-white/10">
                <strong>Active characters</strong>: {props.data.length} / 100
            </h1>

            <div className="flex flex-row flex-wrap gap-16 m-8">
                {props.data.map((character) => (
                    <CharacterPresenter
                        key={character.id}
                        characterId={character.id}
                        characterName={character.name}
                        characterOwner={props.ownerUsername}
                        thumbnailName={character.thumbnailFile?.name}
                    />
                ))}
            </div>
        </div>
    );
}
