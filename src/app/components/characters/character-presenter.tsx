"use server";

import Link from "next/link";
import React from "react";
import Icon from "../icon";
import { faPencil, faBookmark } from "../icons";
import Image from "next/image";

type CharacterPresenterProps = {
    characterId: number;
    characterOwner: string;
    characterName: string;
    thumbnailName?: string;
};

export default async function CharacterPresenter(
    props: CharacterPresenterProps
) {
    const character_url = `/users/${props.characterOwner}/characters/${props.characterId}`;
    return (
        <div key={props.characterId} className="flex flex-col w-60">
            <Link
                href={character_url}
                title={`${props.characterName} by ${props.characterOwner}`}
            >
                <div className="rounded-md p-1 border-2 border-dotted border-indigo-400 flex justiy-center items-center h-60 w-60">
                    <div className="max-h-56 max-w-56 overflow-clip">
                        <Image
                            className="content-center"
                            src={
                                props.thumbnailName
                                    ? `/assets/${props.thumbnailName}`
                                    : "undefined"
                            }
                            width="240"
                            height="240"
                            alt={`${props.characterName} thumbnail`}
                        />
                    </div>
                </div>
            </Link>
            <div className="flex flex-row gap-1 my-2">
                <Link
                    className="h-8 bg-gray-800 flex-grow hover:underline flex flex-row justify-start items-center rounded-md italic text-indigo-400 overflow-clip truncate text-left"
                    href={character_url}
                >
                    <div className="ml-2">{props.characterName}</div>
                </Link>
                <a
                    className="h-8 w-8 bg-gray-800 flex flex-row justify-center items-center hover:text-yellow-400 rounded-md"
                    title="Edit this character"
                    href={`/edit/character/${
                        props.characterId
                    }?sender=${encodeURIComponent("/manage/characters")}`}
                >
                    <Icon icon={faPencil.fas} />
                </a>
                <button
                    className="h-8 w-8 bg-gray-800 flex flex-row justify-center items-center hover:text-yellow-400 rounded-md"
                    title="Bookmark this character"
                >
                    <Icon icon={faBookmark.far} />
                </button>
            </div>
        </div>
    );
}
