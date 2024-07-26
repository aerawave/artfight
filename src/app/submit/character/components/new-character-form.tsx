"use client";

import React from "react";
import CharacterBasicInformation from "./new-character-form/character-basic-information";
import CharacterCredits from "./new-character-form/character-credits";
import CharacterFilters from "./new-character-form/character-filters";
import CharacterTags from "./new-character-form/character-tags";
import CharacterMainImage from "./new-character-form/character-main-image";

export default function NewCharacterForm() {
    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CharacterBasicInformation />
            <CharacterCredits />
            <CharacterFilters />
            <CharacterMainImage />
            <CharacterTags />
        </form>
    );
}
