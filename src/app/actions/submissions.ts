"use server";

import { Characters, Files, Images } from "@/data/db/schema";
import db from "@/data/db/database";
import { auth } from "@clerk/nextjs/server";
import { getUser } from "./user";
import {
    CharacterBasicInformationErrors,
    CharacterCreditsErrors,
    CharacterFiltersErrors,
    CharacterMainImageErrors,
} from "./errors/submissions-errors";
import { GeneralErrors } from "./errors/general";
import { uploadFileContent } from "./data/files/upload";
import { eq } from "drizzle-orm";
import { CharacterSchemas } from "./schemas/character-schemas";

type SubmitCharacterState = {
    success?: boolean;
    errors?: GeneralErrors & {
        basic_information?: CharacterBasicInformationErrors;
        credits?: CharacterCreditsErrors;
        filters?: CharacterFiltersErrors;
        main_image?: CharacterMainImageErrors;
        tags?: GeneralErrors;
    };
};

export async function submitCharacter(
    state: SubmitCharacterState,
    data: FormData
): Promise<SubmitCharacterState> {
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

    const { userId: clerkId } = auth();

    if (!clerkId) {
        return {
            errors: {
                general: ["You are not authenticated."],
            },
        };
    }
    const { id: userId } = await getUser(clerkId);

    let image_id: number = -1;

    try {
        // FIXME: Should only upload once. If the files are uploaded and the submission errors out later, the files will be re-uploaded in future attempts.
        image_id = await uploadImages(
            userId,
            data.get("main_image")?.valueOf() as File,
            data.get("thumbnail")?.valueOf() as File | null,
            is_artist
                ? "uploader"
                : { name: main_image_artist_name, url: main_image_artist_url },
            main_image_filter_moderate_gore,
            main_image_filter_extreme_gore,
            main_image_filter_body_horror,
            main_image_filter_moderate_nudity,
            main_image_filter_extreme_nudity,
            main_image_filter_suggestive_themes,
            main_image_filter_eyestrain,
            main_image_filter_sensitive_content
        );
    } catch (error) {
        return {
            errors: {
                main_image: {
                    general: [
                        `${Math.floor(Math.random() * 100)}`,
                        JSON.stringify(`${error}`),
                    ],
                },
            },
        };
    }

    try {
        await db.insert(Characters).values({
            ownerId: userId,
            name,
            status: "active",
            // "Basic Information"
            description,
            permissions,
            disableGlobalUserPermissions: disable_global_user_permissions,
            externalLinkName: external_link_name,
            externalLinkUrl: external_link_url,
            disableComments: disable_comments,
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
            imageId: image_id,
            // "Tags"
            tags,
        });

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

async function uploadImages(
    owner_id: number,
    image: File,
    thumbnail: File | null,
    artist: "uploader" | { name: string; url: string },
    contains_moderate_gore: boolean,
    contains_extreme_gore: boolean,
    contains_body_horror: boolean,
    contains_moderate_nudity: boolean,
    contains_extreme_nudity: boolean,
    contains_suggestive_themes: boolean,
    contains_eyestrain: boolean,
    contains_sensitive_content: boolean
): Promise<number> {
    thumbnail = thumbnail && thumbnail.size > 0 ? thumbnail : image;

    const { imageId: image_file_id, thumbnailId: thumbnail_file_id } =
        await uploadImageFiles(owner_id, image, thumbnail);

    const is_artist = artist === "uploader";
    const artist_name = is_artist ? "" : artist.name;
    const artist_url = is_artist ? "" : artist.url;

    const { id } = (
        await db
            .insert(Images)
            .values({
                imageFileId: image_file_id,
                thumbnailFileId: thumbnail_file_id,
                isArtist: is_artist,
                artistName: artist_name,
                artistUrl: artist_url,
                containsModerateGore: contains_moderate_gore,
                containsExtremeGore: contains_extreme_gore,
                containsBodyHorror: contains_body_horror,
                containsModerateNudity: contains_moderate_nudity,
                containsExtremeNudity: contains_extreme_nudity,
                containsSuggestiveThemes: contains_suggestive_themes,
                containsEyestrain: contains_eyestrain,
                containsSensitiveContent: contains_sensitive_content,
            })
            .returning({ id: Images.id })
    )[0];

    return id;
}

async function uploadImageFiles(
    owner_id: number,
    image: File,
    thumbnail: File
) {
    let image_file_id: number | null = null;
    let thumbnail_file_id: number | null = null;

    const image_file_upload = uploadFileContent(owner_id, image);
    const thumbnail_file_upload = uploadFileContent(owner_id, thumbnail);

    try {
        image_file_id = (await image_file_upload).fileId;
    } catch (error) {
        // If main image fails upload, delete thumbnail image file.
        thumbnail_file_id = (await thumbnail_file_upload).fileId;
        await db.delete(Files).where(eq(Files.id, thumbnail_file_id));
        throw error;
    }

    try {
        thumbnail_file_id = (await thumbnail_file_upload).fileId;
    } catch (error) {
        // If thumbnail image fails upload, delete main image file.
        await db.delete(Files).where(eq(Files.id, image_file_id));
        throw error;
    }

    return {
        imageId: image_file_id,
        thumbnailId: thumbnail_file_id,
    };
}
