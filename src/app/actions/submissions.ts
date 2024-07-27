"use server";

import { z } from "zod";
import { Characters, Files, Images } from "@/db/schema";
import db from "@/db/database";
import { auth } from "@clerk/nextjs/server";
import { ClerkAPIResponseError } from "@clerk/shared/error";
import { getUser } from "./user";
import {
    CharacterBasicInformationErrors,
    CharacterCreditsErrors,
    CharacterFiltersErrors,
    CharacterMainImageErrors,
} from "./errors/submissions-errors";
import { GeneralErrors } from "./errors/general";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import * as fs from "fs";

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

const yes_no_values = ["yes", "no"];

const is_yes_no = (value: string) => yes_no_values.includes(value);
const from_yes_no = (value: string) => value === "yes";

const yes_no = () =>
    z
        .string({ message: " Required" })
        .refine(is_yes_no, { message: "Required" })
        .transform(from_yes_no);
const schemas = {
    basic_information: z.object({
        name: z
            .string()
            .trim()
            .min(1, { message: "Name must be at least 1 character long." }),
        description: z.string(),
        permissions: z.string(),
        disable_global_user_permissions: z.coerce.boolean(),
        external_link_name: z.string(),
        external_link_url: z.string(),
        disable_comments: z.coerce.boolean(),
    }),
    credits: {
        initial: z.object({
            is_designer: yes_no(),
            does_link_species_sheet: yes_no(),
            additional_credits: z.string(),
        }),
        designer: z.object({
            designer_name: z.string().trim().min(1, { message: "Required" }),
            designer_url: z.string().url({ message: "Required" }),
        }),
        species_sheet: z.object({
            species_name: z.string().trim().min(1, {
                message:
                    "You must provide the specie's name, or opt out of linking a species sheet.",
            }),
            species_sheet_url: z.string().url({
                message:
                    "You must provide the species sheet URL, or opt out of linking a species sheet.",
            }),
        }),
    },
    filters: {
        initial: z.object({
            needs_filters: yes_no(),
        }),
        further: z.object({
            character_filter_moderate_gore: z.coerce.boolean(),
            character_filter_extreme_gore: z.coerce.boolean(),
            character_filter_body_horror: z.coerce.boolean(),
            character_filter_moderate_nudity: z.coerce.boolean(),
            character_filter_extreme_nudity: z.coerce.boolean(),
            character_filter_suggestive_themes: z.coerce.boolean(),
            character_filter_eyestrain: z.coerce.boolean(),
            character_filter_sensitive_content: z.coerce.boolean(),
        }),
    },
    main_image: {
        initial: z.object({
            is_artist: yes_no(),
            main_image_needs_filters: yes_no(),
        }),
        artist: z.object({
            main_image_artist_name: z.string().min(1, { message: "Required" }),
            main_image_artist_url: z.string().url({ message: "Required" }),
        }),
        filters: z.object({
            main_image_filter_moderate_gore: z.coerce.boolean(),
            main_image_filter_extreme_gore: z.coerce.boolean(),
            main_image_filter_body_horror: z.coerce.boolean(),
            main_image_filter_moderate_nudity: z.coerce.boolean(),
            main_image_filter_extreme_nudity: z.coerce.boolean(),
            main_image_filter_suggestive_themes: z.coerce.boolean(),
            main_image_filter_eyestrain: z.coerce.boolean(),
            main_image_filter_sensitive_content: z.coerce.boolean(),
        }),
    },
    tags: z.object({
        tags: z.string(),
    }),
};

export async function submitCharacter(
    state: SubmitCharacterState,
    data: FormData
): Promise<SubmitCharacterState> {
    const validate_basic_information = schemas.basic_information.safeParse({
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

    const validate_credits_initial = schemas.credits.initial.safeParse({
        is_designer: data.get("is_designer"),
        does_link_species_sheet: data.get("does_link_species_sheet"),
        additional_credits: data.get("additional_credits"),
    });

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
        const validate_credits_designer = schemas.credits.designer.safeParse({
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
            schemas.credits.species_sheet.safeParse({
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

    const validate_filters_initial = schemas.filters.initial.safeParse({
        needs_filters: data.get("needs_filters"),
    });

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
        const validate_filters_further = schemas.filters.further.safeParse({
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
            character_filter_eyestrain: data.get("character_filter_eyestrain"),
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

    const validate_main_image_initial = schemas.main_image.initial.safeParse({
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
        const validate_main_image_artist = schemas.main_image.artist.safeParse({
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
            schemas.main_image.filters.safeParse({
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

    const validate_tags = schemas.tags.safeParse({
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
            main_image_filter_moderate_gore,
            main_image_filter_extreme_gore,
            main_image_filter_body_horror,
            main_image_filter_moderate_nudity,
            main_image_filter_extreme_nudity,
            main_image_filter_suggestive_themes,
            main_image_filter_eyestrain,
            main_image_filter_sensitive_content
        );
    } catch (err_) {
        return {
            errors: {
                main_image: {
                    general: [
                        `${Math.floor(Math.random() * 100)}`,
                        JSON.stringify(`${err_}`),
                    ],
                },
            },
        };
    }

    try {
        await db.insert(Characters).values({
            ownerId: userId,
            name,
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
            isArtist: is_artist,
            artistName: main_image_artist_name,
            artistUrl: main_image_artist_url,
            // "Tags"
            tags,
        });

        return {
            success: true,
        };
    } catch (err_) {
        const err = err_ as ClerkAPIResponseError;

        return {
            errors: {
                general: err.errors
                    .map((err) => err.longMessage)
                    .filter((message) => message) as string[],
            },
        };
    }
}

async function uploadImages(
    owner_id: number,
    image: File,
    thumbnail: File | null,
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

    const image_file_id = await uploadFile(owner_id, image);
    const thumbnail_file_id = await uploadFile(owner_id, thumbnail);

    console.error("uploadImage ERR", {
        image_file_id,
        thumbnail_file_id,
    });

    const { id } = (
        await db
            .insert(Images)
            .values({
                imageFileId: image_file_id,
                thumbnailFileId: thumbnail_file_id,
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

async function uploadFile(owner_id: number, file: File): Promise<number> {
    const ext = path.extname(file.name);
    const uuid = await getNewFileUUID(ext);
    const file_name = `${uuid}${ext}`;

    const { id } = (
        await db
            .insert(Files)
            .values({
                ownerId: owner_id,
                name: file_name,
                type: file.type,
            })
            .returning({ id: Files.id })
    )[0];

    const buffer = Buffer.from(await file.arrayBuffer());

    const file_path = `${process.env.FILE_PATH_BEGIN}/${file_name}`;

    await new Promise((resolve, reject) => {
        try {
            fs.writeFile(file_path, buffer, resolve);
        } catch (err) {
            reject(err);
        }
    });

    return id;
}

async function getNewFileUUID(ext: string, max_attempts: number = 10) {
    let uuid = "";
    let found = false;
    for (let i = 0; !found && i < max_attempts; i++) {
        uuid = uuidv4();
        console.log;
        found =
            (
                await db
                    .select({ id: Files.id, name: Files.name })
                    .from(Files)
                    .where((file) => eq(file.name, `${uuid}${ext}`))
                    .limit(1)
            ).length === 0;
    }

    if (!found) {
        throw {
            error: "No UUID was able to be obtained.",
        };
    }

    return uuid;
}
