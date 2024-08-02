import { GeneralErrors } from "./general";

export type CharacterBasicInformationErrors = GeneralErrors & {
    name?: string[];
    slug?: string[];
    description?: string[];
    permissions?: string[];
    external_link_name?: string[];
    external_link_url?: string[];
};

export type CharacterCreditsErrors = GeneralErrors & {
    is_designer?: string[];
    designer_name?: string[];
    designer_url?: string[];
    does_link_species_sheet?: string[];
    species_name?: string[];
    species_sheet_url?: string[];
    additional_credits?: string[];
};

export type CharacterFiltersErrors = GeneralErrors & {
    needs_filters?: string[];
};

export type CharacterMainImageErrors = GeneralErrors & {
    is_artist?: string[];
    main_image_artist_name?: string[];
    main_image_artist_url?: string[];
    main_image_needs_filters?: string[];
};
