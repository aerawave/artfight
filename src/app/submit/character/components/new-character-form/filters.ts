import { ImageFilter } from "@/app/actions/user";

export const filters: { [key in ImageFilter]: [string, string] } = {
    filter_moderate_gore: [
        "Gore (moderate)",
        "Large amounts of realistic/fake blood, fresh unhealed scars, wounds, or major bruising.",
    ],
    filter_extreme_gore: [
        "Gore (extreme)",
        "Exposed or spilling guts of any color, anatomically correct fake gore, eye or nail trauma, flayed skin that reveals detailed tissue/blood.",
    ],
    filter_body_horror: [
        "Body Horror",
        "Unsettling distortions of the body; features in unusual places, parasites, distortion, or out-of-place hyperrealism.",
    ],
    filter_moderate_nudity: [
        "Nudity (moderate)",
        "Exposed humanoid nipples (regardless of gender).",
    ],
    filter_extreme_nudity: [
        "Nudity (extreme)",
        "Any exposed non-erect or closed genitalia. Reminder: Ereect/open genitalia is NOT allowed on Art Fight!",
    ],
    filter_suggestive_themes: [
        "Suggestive Themes",
        "Anything involving suggestive posing or fetish content. Reminder: explicit NSFW and certain fetish works are NOT allowed on Art Fight. Please review our filter guide for more details.",
    ],
    filter_eyestrain: [
        "Eyestrain",
        "High-contrast patterns, any flashing imagery, and extreme chromatic aberration.",
    ],
    filter_sensitive_content: [
        "Sensitive Content",
        "This filter refers to characters or images which contain sensitive content not specified in the gore, body horror, nudity, and sexual themes filter categories. The sensitive content filter is in addition to the rest of the filters.",
    ],
};
