import { ImageFilter } from "@/app/actions/user";
import { Section } from "@/app/components/section";
import YesNo, { YesNoType } from "@/app/components/yes-no";
import Link from "next/link";
import React, { useState } from "react";
import { filters } from "./filters";
import { NEW_CHARACTER_FORM } from "../new-character-form";
import { CharacterFiltersErrors } from "@/app/actions/errors/submissions-errors";
import { ErrorList } from "@/app/user/settings/components/user-settings/error-list";
import { Label } from "@radix-ui/react-label";
import Icon from "@/app/components/icon";
import {
    faCheck,
    faQuestionCircle,
    faTriangleExclamation,
} from "@/app/components/icons";
import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";

export default function CharacterFilters(props: {
    errors?: CharacterFiltersErrors;
}) {
    const [needs_filters, setNeedsFilters] = useState<YesNoType | undefined>(
        undefined
    );

    return (
        <Section title="Character Filters">
            <div className="flex flex-col gap-4">
                <div className="rounded-md bg-cyan-600 p-3 text-xl text-white">
                    <p>
                        Check the filters that apply to this character&apos;
                        description and other content on the profile.
                    </p>
                </div>
                <ErrorList errors={props.errors?.general} />
                <div className="flex flex-row justify-between items-center">
                    <Label
                        htmlFor="needs_filters"
                        className="font-bold text-sm text-white/75"
                    >
                        Does this character need a content filter?
                        <span className="text-red-500">*</span>
                    </Label>

                    <YesNo
                        id="needs_filters"
                        name="needs_filters"
                        value={needs_filters}
                        onChange={setNeedsFilters}
                        form={NEW_CHARACTER_FORM}
                    />
                    <ErrorList errors={props.errors?.needs_filters} />
                </div>
                <div>
                    <p>
                        <Icon
                            icon={faTriangleExclamation.fas}
                            className="mr-2"
                        />
                        <span>
                            Please make sure you take a look at our{" "}
                            <Link
                                href="/info/guide-filters"
                                className="highlight"
                            >
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
                            <strong>Please check all that apply.</strong> Hover
                            over the{" "}
                            <Icon
                                icon={faQuestionCircle.fas}
                                className="pl-1"
                            />
                            s for more information.
                        </p>

                        {Object.keys(filters).map((key) => {
                            const id = `character_${key}`;
                            return (
                                <div
                                    key={key}
                                    className="flex flex-row gap-2 items-center"
                                >
                                    <Checkbox
                                        id={id}
                                        name={id}
                                        form={NEW_CHARACTER_FORM}
                                        className="shadow-blackA4 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
                                    >
                                        <CheckboxIndicator>
                                            <Icon
                                                icon={faCheck.fas}
                                                className="text-black"
                                            />
                                        </CheckboxIndicator>
                                    </Checkbox>
                                    <Label
                                        htmlFor={id}
                                        className="font-bold text-sm text-white/75"
                                    >
                                        <span>
                                            {filters[key as ImageFilter][0]}
                                        </span>
                                        <Tooltip delayDuration={0}>
                                            <TooltipTrigger className="mx-2">
                                                <Icon
                                                    icon={faQuestionCircle.fas}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent className="w-40 text-center text-xs p-2 rounded-lg bg-black text-white border-white/20 border">
                                                <p>
                                                    {
                                                        filters[
                                                            key as ImageFilter
                                                        ][1]
                                                    }
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </Label>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <>
                        {Object.keys(filters).map((key) => (
                            <input
                                key={key}
                                type="checkbox"
                                name={`character_${key}`}
                                hidden
                                readOnly
                                form={NEW_CHARACTER_FORM}
                            />
                        ))}
                    </>
                )}
            </div>
        </Section>
    );
}
