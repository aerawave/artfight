"use server";

import React from "react";

export default async function CharacterAttacksTab(props: {
    username: string;
    characterId: number;
}) {
    return (
        <div>
            {props.username}, {props.characterId}
        </div>
    );
}
