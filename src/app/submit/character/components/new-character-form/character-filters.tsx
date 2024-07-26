import { ImageFilter } from "@/app/actions/user";
import { Section } from "@/app/components/section";
import Tooltipper from "@/app/components/tooltipper";
import YesNo, { YesNoType } from "@/app/components/yes-no";
import { faQuestionCircle, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Input, Label } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";

export default function CharacterFilters() {
    const [needs_filters, setNeedsFilters] = useState<YesNoType | undefined>(
        undefined
    );

    const filters: { [key in ImageFilter]: [string, string] } = {
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

    return (
        <Section title="Character Filters">
            <div className="rounded-md bg-cyan-600 p-3 text-xl text-white">
                <p>
                    Check the filters that apply to this character&apos;
                    description and other content on the profile.
                </p>
            </div>
            <Field className="flex flex-row justify-between">
                <Label className="font-bold text-sm text-white/75">
                    Does this character need a content filter?
                    <span className="text-red-500">*</span>
                </Label>
                <YesNo
                    name="needs_filters"
                    value={needs_filters}
                    onChange={setNeedsFilters}
                />
            </Field>
            <div>
                <p>
                    <FontAwesomeIcon icon={faWarning} className="mr-2" />
                    <span>
                        Please make sure you take a look at our{" "}
                        <Link href="/info/guide-filters" className="highlight">
                            Filter Guide
                        </Link>{" "}
                        for what needs to be filtered.
                    </span>
                </p>
            </div>
            {needs_filters === "yes" ? (
                <>
                    <hr className="border-white/20 my-4" />

                    <p>
                        <strong>Please check all that apply.</strong> Hover over
                        the{" "}
                        <FontAwesomeIcon
                            className="px-1"
                            icon={faQuestionCircle}
                        />
                        s for more information.
                    </p>

                    {Object.keys(filters).map((key) => (
                        <Field key={key} className="flex flex-row gap-2">
                            <Input type="checkbox" name={key} />
                            <div>
                                <Label className="font-bold text-sm text-white/75">
                                    {filters[key as ImageFilter][0]}
                                </Label>
                                <Tooltipper
                                    className="inline-block ml-2"
                                    buttonClassName="rounded-full"
                                    target={
                                        <FontAwesomeIcon
                                            className="px-1"
                                            icon={faQuestionCircle}
                                        />
                                    }
                                    popoverClassName="p-2 rounded-lg bg-black text-white border-white/20 border"
                                    content={
                                        <p>{filters[key as ImageFilter][1]}</p>
                                    }
                                />
                            </div>
                        </Field>
                    ))}
                </>
            ) : (
                <>
                    {Object.keys(filters).map((key) => (
                        <Input key={key} type="checkbox" name={key} hidden />
                    ))}
                </>
            )}
        </Section>
    );
}
