"use client";

import React, { useRef } from "react";
import CharacterBasicInformation from "./new-character-form/character-basic-information";
import CharacterCredits from "./new-character-form/character-credits";
import CharacterFilters from "./new-character-form/character-filters";
import CharacterTags from "./new-character-form/character-tags";
import CharacterMainImage from "./new-character-form/character-main-image";
import { useFormState } from "react-dom";
import { submitCharacter } from "@/app/actions";
import { redirect } from "next/navigation";
import { ErrorList } from "@/app/user/settings/components/user-settings/error-list";

export const NEW_CHARACTER_FORM = "new-character-form";

export default function NewCharacterForm() {
    const [state, action] = useFormState(submitCharacter, {});

    const submit = (data: FormData) => {
        action(data);
        window.scrollTo(0, 0);
    };

    if (state.success) {
        redirect("/manage/characters");
    }

    const form = useRef<HTMLFormElement>(null);

    return (
        <div className="flex flex-col gap-4">
            {state.errors && (
                <div>
                    <h5 className="text-red-500">
                        There were errors in your submission.
                        <p>{JSON.stringify(state.errors)}</p>
                    </h5>
                    <ErrorList errors={state.errors?.general} />
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CharacterBasicInformation
                    errors={state.errors?.basic_information}
                />
                <CharacterCredits errors={state.errors?.credits} />
                <CharacterFilters errors={state.errors?.filters} />
                <CharacterMainImage errors={state.errors?.main_image} />
                <CharacterTags errors={state.errors?.tags} />
            </div>
            <form
                id={NEW_CHARACTER_FORM}
                action={submit}
                ref={form}
                className="flex flex-col"
            >
                <button
                    className="p-4 bg-cyan-500 rounded-lg m-4"
                    onClick={() => form.current?.requestSubmit()}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
