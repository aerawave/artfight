"use client";

import React from "react";
import CharacterBasicInformation from "./new-character-form/character-basic-information";
import CharacterCredits from "./new-character-form/character-credits";
import CharacterFilters from "./new-character-form/character-filters";

export default function NewCharacterForm() {
    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            action={(data) =>
                console.log(
                    JSON.stringify({
                        name: data.get("name"),
                        description: data.get("description"),
                    })
                )
            }
        >
            <CharacterBasicInformation />
            <CharacterCredits />
            <CharacterFilters />
        </form>
    );
}
