"use server";

import { auth } from "@clerk/nextjs/server";
import { GeneralErrors } from "../errors/general";
import {
    CharacterBasicInformationErrors,
    CharacterCreditsErrors,
    CharacterFiltersErrors,
    CharacterMainImageErrors,
} from "../errors/submissions-errors";
import { CharacterSchemas } from "../schemas/character-schemas";
import { getUser } from "../user";
import db from "@/data/db/database";
import { Characters, Images } from "@/data/db/schema";
import { and, eq, InferSelectModel } from "drizzle-orm";

type SubmitCharacterEditState = {
    success?: boolean;
    errors?: GeneralErrors & {
        basic_information?: CharacterBasicInformationErrors;
        credits?: CharacterCreditsErrors;
        filters?: CharacterFiltersErrors;
        main_image?: CharacterMainImageErrors;
        tags?: GeneralErrors;
    };
};

export async function submitCharacterEdit(
    state: SubmitCharacterEditState,
    data: FormData
): Promise<SubmitCharacterEditState> {
    const validate_character_id = CharacterSchemas.character_id.safeParse({
        character_id: data.get("character_id"),
    });

    if (!validate_character_id.success) {
        return {
            errors: {
                general:
                    validate_character_id.error.flatten().fieldErrors
                        .character_id,
            },
        };
    }

    const { character_id } = validate_character_id.data;

    const { userId: clerkId } = auth();

    if (!clerkId) {
        return {
            errors: {
                general: ["You are not authenticated."],
            },
        };
    }

    const { id: userId } = await getUser(clerkId);

    if (!userId) {
        return {
            errors: {
                general: ["You are not authenticated."],
            },
        };
    }

    const record = (
        (await db
            .select({
                id: Characters.id,
                ownerId: Characters.ownerId,
                imageId: Characters.imageId,
            })
            .from(Characters)
            .where(
                and(
                    eq(Characters.id, character_id),
                    eq(Characters.ownerId, userId)
                )
            )
            .limit(1)) as (InferSelectModel<typeof Characters> | undefined)[]
    )[0];

    if (!record) {
        return {
            errors: {
                general: ["You don't own that character!"],
            },
        };
    }

    // const dt: Record<string, FormDataEntryValue | null> = {};
    // const iter = data.keys();
    // let entry: ReturnType<typeof iter.next>;

    // while (!(entry = iter.next()).done) {
    //     dt[entry.value] = data.get(entry.value);
    // }

    // return {
    //     errors: { general: [JSON.stringify(dt)] },
    // };

    const validate_basic_information =
        CharacterSchemas.basic_information.safeParse({
            name: data.get("name"),
            description: data.get("description"),
            permissions: data.get("permissions"),
            disable_global_user_permissions: data.get(
                "disable_global_user_permissions"
            ),
            external_link_name: data.get("external_link_name"),
            external_link_url: data.get("external_link_url"),
            disable_comments: data.get("disable_comments"),
        });

    if (!validate_basic_information.success) {
        return {
            errors: {
                basic_information:
                    validate_basic_information.error.flatten().fieldErrors,
            },
        };
    }

    const validate_credits_initial = CharacterSchemas.credits.initial.safeParse(
        {
            is_designer: data.get("is_designer"),
            does_link_species_sheet: data.get("does_link_species_sheet"),
            additional_credits: data.get("additional_credits"),
        }
    );

    validate_credits_initial.data?.is_designer;

    if (!validate_credits_initial.success) {
        return {
            errors: {
                credits: validate_credits_initial.error.flatten().fieldErrors,
            },
        };
    }

    const is_designer = validate_credits_initial.data.is_designer;

    let [designer_name, designer_url] = ["", ""];

    if (!is_designer) {
        const validate_credits_designer =
            CharacterSchemas.credits.designer.safeParse({
                designer_name: data.get("designer_name"),
                designer_url: data.get("designer_url"),
            });

        if (!validate_credits_designer.success) {
            return {
                errors: {
                    credits:
                        validate_credits_designer.error.flatten().fieldErrors,
                },
            };
        }
        designer_name = validate_credits_designer.data.designer_name;
        designer_url = validate_credits_designer.data.designer_url;
    }

    const does_link_species_sheet =
        validate_credits_initial.data.does_link_species_sheet;
    let [species_name, species_sheet_url] = ["", ""];

    if (does_link_species_sheet) {
        const validate_credits_species_sheet =
            CharacterSchemas.credits.species_sheet.safeParse({
                species_name: data.get("species_name"),
                species_sheet_url: data.get("species_sheet_url"),
            });

        if (!validate_credits_species_sheet.success) {
            return {
                errors: {
                    credits:
                        validate_credits_species_sheet.error.flatten()
                            .fieldErrors,
                },
            };
        }

        species_name = validate_credits_species_sheet.data.species_name;
        species_sheet_url =
            validate_credits_species_sheet.data.species_sheet_url;
    }

    const validate_filters_initial = CharacterSchemas.filters.initial.safeParse(
        {
            needs_filters: data.get("needs_filters"),
        }
    );

    if (!validate_filters_initial.success) {
        return {
            errors: {
                filters: validate_filters_initial.error.flatten().fieldErrors,
            },
        };
    }

    const needs_filters = validate_filters_initial.data.needs_filters;

    let [
        character_filter_moderate_gore,
        character_filter_extreme_gore,
        character_filter_body_horror,
        character_filter_moderate_nudity,
        character_filter_extreme_nudity,
        character_filter_suggestive_themes,
        character_filter_eyestrain,
        character_filter_sensitive_content,
    ] = new Array<boolean>(8).fill(false);

    if (needs_filters) {
        const validate_filters_further =
            CharacterSchemas.filters.filters.safeParse({
                character_filter_moderate_gore: data.get(
                    "character_filter_moderate_gore"
                ),
                character_filter_extreme_gore: data.get(
                    "character_filter_extreme_gore"
                ),
                character_filter_body_horror: data.get(
                    "character_filter_body_horror"
                ),
                character_filter_moderate_nudity: data.get(
                    "character_filter_moderate_nudity"
                ),
                character_filter_extreme_nudity: data.get(
                    "character_filter_extreme_nudity"
                ),
                character_filter_suggestive_themes: data.get(
                    "character_filter_suggestive_themes"
                ),
                character_filter_eyestrain: data.get(
                    "character_filter_eyestrain"
                ),
                character_filter_sensitive_content: data.get(
                    "character_filter_sensitive_content"
                ),
            });
        if (!validate_filters_further.success) {
            return {
                errors: {
                    filters: {
                        general: ["An unknown validation error occurred."],
                    },
                },
            };
        }

        character_filter_moderate_gore =
            validate_filters_further.data.character_filter_moderate_gore;
        character_filter_extreme_gore =
            validate_filters_further.data.character_filter_extreme_gore;
        character_filter_body_horror =
            validate_filters_further.data.character_filter_body_horror;
        character_filter_moderate_nudity =
            validate_filters_further.data.character_filter_moderate_nudity;
        character_filter_extreme_nudity =
            validate_filters_further.data.character_filter_extreme_nudity;
        character_filter_suggestive_themes =
            validate_filters_further.data.character_filter_suggestive_themes;
        character_filter_eyestrain =
            validate_filters_further.data.character_filter_eyestrain;
        character_filter_sensitive_content =
            validate_filters_further.data.character_filter_sensitive_content;
    }

    const validate_main_image_initial =
        CharacterSchemas.main_image.initial.safeParse({
            is_artist: data.get("is_artist"),
            main_image_needs_filters: data.get("main_image_needs_filters"),
        });

    if (!validate_main_image_initial.success) {
        return {
            errors: {
                main_image:
                    validate_main_image_initial.error.flatten().fieldErrors,
            },
        };
    }

    const { is_artist, main_image_needs_filters } =
        validate_main_image_initial.data;

    let [main_image_artist_name, main_image_artist_url] = ["", ""];

    if (!is_artist) {
        const validate_main_image_artist =
            CharacterSchemas.main_image.artist.safeParse({
                main_image_artist_name: data.get("main_image_artist_name"),
                main_image_artist_url: data.get("main_image_artist_url"),
            });

        if (!validate_main_image_artist.success) {
            return {
                errors: {
                    main_image:
                        validate_main_image_artist.error.flatten().fieldErrors,
                },
            };
        }

        main_image_artist_name =
            validate_main_image_artist.data.main_image_artist_name;
        main_image_artist_url =
            validate_main_image_artist.data.main_image_artist_url;
    }

    let [
        main_image_filter_moderate_gore,
        main_image_filter_extreme_gore,
        main_image_filter_body_horror,
        main_image_filter_moderate_nudity,
        main_image_filter_extreme_nudity,
        main_image_filter_suggestive_themes,
        main_image_filter_eyestrain,
        main_image_filter_sensitive_content,
    ] = new Array<boolean>(8).fill(false);

    if (main_image_needs_filters) {
        const validate_main_image_filters =
            CharacterSchemas.main_image.filters.safeParse({
                main_image_filter_moderate_gore: data.get(
                    "main_image_filter_moderate_gore"
                ),
                main_image_filter_extreme_gore: data.get(
                    "main_image_filter_extreme_gore"
                ),
                main_image_filter_body_horror: data.get(
                    "main_image_filter_body_horror"
                ),
                main_image_filter_moderate_nudity: data.get(
                    "main_image_filter_moderate_nudity"
                ),
                main_image_filter_extreme_nudity: data.get(
                    "main_image_filter_extreme_nudity"
                ),
                main_image_filter_suggestive_themes: data.get(
                    "main_image_filter_suggestive_themes"
                ),
                main_image_filter_eyestrain: data.get(
                    "main_image_filter_eyestrain"
                ),
                main_image_filter_sensitive_content: data.get(
                    "main_image_filter_sensitive_content"
                ),
            });

        if (!validate_main_image_filters.success) {
            return {
                errors: {
                    main_image: {
                        general: ["An unknown validation error occurred."],
                    },
                },
            };
        }

        main_image_filter_moderate_gore =
            validate_main_image_filters.data.main_image_filter_moderate_gore;
        main_image_filter_extreme_gore =
            validate_main_image_filters.data.main_image_filter_extreme_gore;
        main_image_filter_body_horror =
            validate_main_image_filters.data.main_image_filter_body_horror;
        main_image_filter_moderate_nudity =
            validate_main_image_filters.data.main_image_filter_moderate_nudity;
        main_image_filter_extreme_nudity =
            validate_main_image_filters.data.main_image_filter_extreme_nudity;
        main_image_filter_suggestive_themes =
            validate_main_image_filters.data
                .main_image_filter_suggestive_themes;
        main_image_filter_eyestrain =
            validate_main_image_filters.data.main_image_filter_eyestrain;
        main_image_filter_sensitive_content =
            validate_main_image_filters.data
                .main_image_filter_sensitive_content;
    }

    const validate_tags = CharacterSchemas.tags.safeParse({
        tags: data.get("tags"),
    });

    if (!validate_tags.success) {
        return {
            errors: {
                tags: {
                    general: ["An unknown validation error occurred."],
                },
            },
        };
    }

    // "Basic Information"
    const {
        name,
        description,
        permissions,
        disable_global_user_permissions,
        external_link_name,
        external_link_url,
        disable_comments,
    } = validate_basic_information.data;

    // "Credits"
    const additional_credits = validate_credits_initial.data.additional_credits;
    // "Tags"
    const tags = validate_tags.data.tags;

    // TODO: handle images

    try {
        await db
            .update(Characters)
            .set({
                // "Basic Information"
                name,
                description,
                permissions,
                disableGlobalUserPermissions: disable_global_user_permissions,
                externalLinkName: external_link_name,
                externalLinkUrl: external_link_url,
                disableComments: disable_comments,
                // "Credits"
                // "Credits"
                isDesigner: is_designer,
                designerName: designer_name,
                designerUrl: designer_url,
                doesLinkSpeciesSheet: does_link_species_sheet,
                speciesName: species_name,
                speciesSheetUrl: species_sheet_url,
                additionalCredits: additional_credits,
                // "Character Filters"
                containsModerateGore: character_filter_moderate_gore,
                containsExtremeGore: character_filter_extreme_gore,
                containsBodyHorror: character_filter_body_horror,
                containsModerateNudity: character_filter_moderate_nudity,
                containsExtremeNudity: character_filter_extreme_nudity,
                containsSuggestiveThemes: character_filter_suggestive_themes,
                containsEyestrain: character_filter_eyestrain,
                containsSensitiveContent: character_filter_sensitive_content,
                // "Main Image"
                // TODO...
                // "Tags"
                tags,
            })
            .where(eq(Characters.id, character_id));

        await db
            .update(Images)
            .set({
                isArtist: is_artist,
                artistName: is_artist ? "" : main_image_artist_name,
                artistUrl: is_artist ? "" : main_image_artist_url,
                containsModerateGore: main_image_filter_moderate_gore,
                containsExtremeGore: main_image_filter_extreme_gore,
                containsBodyHorror: main_image_filter_body_horror,
                containsModerateNudity: main_image_filter_moderate_nudity,
                containsExtremeNudity: main_image_filter_extreme_nudity,
                containsSuggestiveThemes: main_image_filter_suggestive_themes,
                containsEyestrain: main_image_filter_eyestrain,
                containsSensitiveContent: main_image_filter_sensitive_content,
            })
            .where(eq(Images.id, record.imageId));

        return {
            success: true,
        };
    } catch (error) {
        return {
            errors: {
                general: [`${error}`],
            },
        };
    }
}
