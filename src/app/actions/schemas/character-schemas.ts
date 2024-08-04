import { z } from "zod";
import { yes_no } from "./yes-no-schema";

export const CharacterIdSchema = z.object({
    character_id: z.coerce.number(),
});

export const CharacterBasicInformationSchema = z.object({
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
});

export const CharacterCreditsInitialSchema = z.object({
    is_designer: yes_no(),
    does_link_species_sheet: yes_no(),
    additional_credits: z.string(),
});

export const CharacterCreditsDesignerSchema = z.object({
    designer_name: z.string().trim().min(1, { message: "Required" }),
    designer_url: z.string().url({ message: "Required" }),
});

export const CharacterCreditsSpeciesSheetSchema = z.object({
    species_name: z.string().trim().min(1, {
        message:
            "You must provide the specie's name, or opt out of linking a species sheet.",
    }),
    species_sheet_url: z.string().url({
        message:
            "You must provide the species sheet URL, or opt out of linking a species sheet.",
    }),
});

export const CharacterFiltersInitialSchema = z.object({
    needs_filters: yes_no(),
});

export const CharacterFiltersFiltersSchema = z.object({
    character_filter_moderate_gore: z.coerce.boolean(),
    character_filter_extreme_gore: z.coerce.boolean(),
    character_filter_body_horror: z.coerce.boolean(),
    character_filter_moderate_nudity: z.coerce.boolean(),
    character_filter_extreme_nudity: z.coerce.boolean(),
    character_filter_suggestive_themes: z.coerce.boolean(),
    character_filter_eyestrain: z.coerce.boolean(),
    character_filter_sensitive_content: z.coerce.boolean(),
});

export const CharacterMainImageInitialSchema = z.object({
    is_artist: yes_no(),
    main_image_needs_filters: yes_no(),
});

export const CharacterMainImageArtistSchema = z.object({
    main_image_artist_name: z.string().min(1, { message: "Required" }),
    main_image_artist_url: z.string().url({ message: "Required" }),
});

export const CharacterMainImageFiltersSchema = z.object({
    main_image_filter_moderate_gore: z.coerce.boolean(),
    main_image_filter_extreme_gore: z.coerce.boolean(),
    main_image_filter_body_horror: z.coerce.boolean(),
    main_image_filter_moderate_nudity: z.coerce.boolean(),
    main_image_filter_extreme_nudity: z.coerce.boolean(),
    main_image_filter_suggestive_themes: z.coerce.boolean(),
    main_image_filter_eyestrain: z.coerce.boolean(),
    main_image_filter_sensitive_content: z.coerce.boolean(),
});

export const CharacterTagsSchema = z.object({
    tags: z.string(),
});

export const CharacterSchemas = {
    character_id: CharacterIdSchema,
    basic_information: CharacterBasicInformationSchema,
    credits: {
        initial: CharacterCreditsInitialSchema,
        designer: CharacterCreditsDesignerSchema,
        species_sheet: CharacterCreditsSpeciesSheetSchema,
    },
    filters: {
        initial: CharacterFiltersInitialSchema,
        filters: CharacterFiltersFiltersSchema,
    },
    main_image: {
        initial: CharacterMainImageInitialSchema,
        artist: CharacterMainImageArtistSchema,
        filters: CharacterMainImageFiltersSchema,
    },
    tags: CharacterTagsSchema,
};
