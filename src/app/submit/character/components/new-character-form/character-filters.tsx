import { ImageFilter } from "@/app/actions/user";
import { Section } from "@/app/components/section";
import Tooltipper from "@/app/components/tooltipper";
import YesNo, { YesNoType } from "@/app/components/yes-no";
import { faQuestionCircle, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Input, Label } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";
import { filters } from "./filters";
import { NEW_CHARACTER_FORM } from "../new-character-form";
import { CharacterFiltersErrors } from "@/app/actions/errors/submissions-errors";
import { ErrorList } from "@/app/user/settings/components/user-settings/error-list";

export default function CharacterFilters(props: {
    errors?: CharacterFiltersErrors;
}) {
    const [needs_filters, setNeedsFilters] = useState<YesNoType | undefined>(
        undefined
    );

    return (
        <Section title="Character Filters" className="flex flex-col gap-4">
            <div className="rounded-md bg-cyan-600 p-3 text-xl text-white">
                <p>
                    Check the filters that apply to this character&apos;
                    description and other content on the profile.
                </p>
            </div>
            <ErrorList errors={props.errors?.general} />
            <Field>
                <div className="flex flex-row justify-between items-center">
                    <Label className="font-bold text-sm text-white/75">
                        Does this character need a content filter?
                        <span className="text-red-500">*</span>
                    </Label>
                    <YesNo
                        name="needs_filters"
                        value={needs_filters}
                        onChange={setNeedsFilters}
                        form={NEW_CHARACTER_FORM}
                    />
                </div>
                <ErrorList errors={props.errors?.needs_filters} />
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
                            <Input
                                type="checkbox"
                                name={`character_${key}`}
                                form={NEW_CHARACTER_FORM}
                            />
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
                        <Input
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
        </Section>
    );
}
