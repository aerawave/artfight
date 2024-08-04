"use server";

import Link from "next/link";
import React from "react";
import Icon from "../icon";
import { faPencil, faBookmark } from "../icons";
import Image from "next/image";

import "./character-presenter.css";

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
        <div className="character-presenter">
            <Link
                href={character_url}
                title={`${props.characterName} by ${props.characterOwner}`}
            >
                <div className="image-holder">
                    <div className="image-clipper">
                        <Image
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
            <div className="links">
                <Link className="main-link" href={character_url}>
                    {props.characterName}
                </Link>
                <a
                    className="side-link"
                    title="Edit this character"
                    href={`/edit/character/${
                        props.characterId
                    }?sender=${encodeURIComponent("/manage/characters")}`}
                >
                    <Icon icon={faPencil.fas} />
                </a>
                <button className="side-link" title="Bookmark this character">
                    <Icon icon={faBookmark.far} />
                </button>
            </div>
        </div>
    );
}
