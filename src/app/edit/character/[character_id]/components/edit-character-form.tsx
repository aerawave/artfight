"use client";

import { submitCharacterEdit } from "@/app/actions/data/characters/edit";
import SubmitButton from "@/app/components/submit-button";
import CharacterBasicInformation from "@/app/submit/character/components/new-character-form/character-basic-information";
import CharacterCredits from "@/app/submit/character/components/new-character-form/character-credits";
import CharacterFilters from "@/app/submit/character/components/new-character-form/character-filters";
import CharacterMainImage from "@/app/submit/character/components/new-character-form/character-main-image";
import CharacterTags from "@/app/submit/character/components/new-character-form/character-tags";
import { ErrorList } from "@/app/user/settings/components/user-settings/error-list";
import { Characters, Images } from "@/data/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { redirect } from "next/navigation";
import React, { useRef } from "react";
import { useFormState } from "react-dom";

export const EDIT_CHARACTER_FORM = "edit-character-form";

export default function EditCharacterForm(props: {
    owner: string;
    character: InferSelectModel<typeof Characters>;
    mainImage: InferSelectModel<typeof Images>;
    sender?: string;
}) {
    const [state, action] = useFormState(submitCharacterEdit, {});

    const submit = (data: FormData) => {
        action(data);
        window.scrollTo(0, 0);
    };

    if (state.success) {
        redirect(
            props.sender?.startsWith("/")
                ? props.sender
                : `/users/${props.owner}/characters/${props.character.id}`
        );
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
                    <ErrorList errors={state.errors.general} />
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CharacterBasicInformation
                    defaults={{
                        name: props.character.name,
                        description: props.character.description ?? undefined,
                        permissions: props.character.permissions ?? undefined,
                        disableGlobalUserPermissions:
                            props.character.disableGlobalUserPermissions ??
                            undefined,
                        externalLinkName:
                            props.character.externalLinkName ?? undefined,
                        externalLinkUrl:
                            props.character.externalLinkUrl ?? undefined,
                        disableComments:
                            props.character.disableComments ?? undefined,
                    }}
                    errors={state.errors?.basic_information}
                    form={EDIT_CHARACTER_FORM}
                />
                <CharacterCredits
                    defaults={{
                        isDesigner: props.character.isDesigner ?? undefined,
                        designerName: props.character.designerName ?? undefined,
                        designerUrl: props.character.designerUrl ?? undefined,
                        doesLinkSpeciesSheet:
                            props.character.doesLinkSpeciesSheet ?? undefined,
                        speciesName: props.character.speciesName ?? undefined,
                        speciesSheetUrl:
                            props.character.speciesSheetUrl ?? undefined,
                        additionalCredits:
                            props.character.additionalCredits ?? undefined,
                    }}
                    errors={state.errors?.credits}
                    form={EDIT_CHARACTER_FORM}
                />
                <CharacterFilters
                    defaults={{
                        neededFilters: {
                            filter_moderate_gore:
                                props.character.containsModerateGore ??
                                undefined,
                            filter_extreme_gore:
                                props.character.containsExtremeGore ??
                                undefined,
                            filter_body_horror:
                                props.character.containsBodyHorror ?? undefined,
                            filter_moderate_nudity:
                                props.character.containsModerateNudity ??
                                undefined,
                            filter_extreme_nudity:
                                props.character.containsExtremeNudity ??
                                undefined,
                            filter_suggestive_themes:
                                props.character.containsSuggestiveThemes ??
                                undefined,
                            filter_eyestrain:
                                props.character.containsEyestrain ?? undefined,
                            filter_sensitive_content:
                                props.character.containsSensitiveContent ??
                                undefined,
                        },
                    }}
                    errors={state.errors?.filters}
                    form={EDIT_CHARACTER_FORM}
                />
                <CharacterMainImage
                    defaults={{
                        imageId: props.character.imageId,
                        isArtist: props.mainImage.isArtist ?? undefined,
                        artistName: props.mainImage.artistName ?? undefined,
                        artistUrl: props.mainImage.artistUrl ?? undefined,
                        neededFilters: {
                            filter_moderate_gore:
                                props.mainImage.containsModerateGore ??
                                undefined,
                            filter_extreme_gore:
                                props.mainImage.containsExtremeGore ??
                                undefined,
                            filter_body_horror:
                                props.mainImage.containsBodyHorror ?? undefined,
                            filter_moderate_nudity:
                                props.mainImage.containsModerateNudity ??
                                undefined,
                            filter_extreme_nudity:
                                props.mainImage.containsExtremeNudity ??
                                undefined,
                            filter_suggestive_themes:
                                props.mainImage.containsSuggestiveThemes ??
                                undefined,
                            filter_eyestrain:
                                props.mainImage.containsEyestrain ?? undefined,
                            filter_sensitive_content:
                                props.mainImage.containsSensitiveContent ??
                                undefined,
                        },
                    }}
                    errors={state.errors?.main_image}
                    form={EDIT_CHARACTER_FORM}
                />
                <CharacterTags
                    defaults={{
                        tags: (props.character.tags ?? "")
                            .split(" ")
                            .filter(Boolean),
                    }}
                    errors={state.errors?.tags}
                    form={EDIT_CHARACTER_FORM}
                />
            </div>
            <form
                id={EDIT_CHARACTER_FORM}
                action={submit}
                ref={form}
                className="flex flex-col"
            >
                <input
                    hidden
                    name="character_id"
                    value={props.character.id}
                    readOnly
                />
                <SubmitButton label="Save" />
            </form>
        </div>
    );
}
