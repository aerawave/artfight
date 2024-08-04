"use server";

import React from "react";
import { getCharacters } from "@/app/actions/data/characters/character-list";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/app/components/icon";
import { faBookmark, faPencil } from "@/app/components/icons";

type ActiveCharactersProps = {
    ownerUsername: string;
    data: Awaited<ReturnType<typeof getCharacters>>;
};

export default async function ActiveCharacters(props: ActiveCharactersProps) {
    return (
        <div>
            <div className="p-4 bg-cyan-400/40 rounded-md mb-4">
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
            </div>
            <h1 className="text-4xl pb-2 border-b border-b-white/10">
                <strong>Active characters</strong>: {props.data.length} / 100
            </h1>

            <div className="flex flex-row flex-wrap gap-16 m-8">
                {props.data.map((character) => {
                    const character_url = `/users/${props.ownerUsername}/characters/${character.id}`;
                    return (
                        <div key={character.id} className="flex flex-col w-60">
                            <Link
                                href={character_url}
                                title={`${character.name} by ${props.ownerUsername}`}
                            >
                                <Image
                                    className="rounded-md p-1 border-2 border-dotted border-indigo-400"
                                    src={
                                        character.thumbnailFile
                                            ? `/assets/${character.thumbnailFile.name}`
                                            : "undefined"
                                    }
                                    width="240"
                                    height="240"
                                    alt={`${character.name} thumbnail`}
                                />
                            </Link>
                            <div className="flex flex-row">
                                <Link
                                    className="h-8 bg-gray-800 m-2 ml-0 flex-grow hover:underline flex flex-row justify-center items-center rounded-md italic text-indigo-400"
                                    href={character_url}
                                >
                                    {character.name}
                                </Link>
                                <a
                                    className="h-8 w-8 bg-gray-800 m-2 mr-0 flex flex-row justify-center items-center hover:text-yellow-400 rounded-md"
                                    title="Edit this character"
                                    href={`/edit/character/${
                                        character.id
                                    }?sender=${encodeURIComponent(
                                        "/manage/characters"
                                    )}`}
                                >
                                    <Icon icon={faPencil.fas} />
                                </a>
                                <button
                                    className="h-8 w-8 bg-gray-800 m-2 mr-0 flex flex-row justify-center items-center hover:text-yellow-400 rounded-md"
                                    title="Bookmark this character"
                                >
                                    <Icon icon={faBookmark.far} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
