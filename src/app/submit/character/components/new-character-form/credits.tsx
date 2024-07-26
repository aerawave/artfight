import MarkdownBox from "@/app/components/markdown-box";
import { Section } from "@/app/components/section";
import Tooltipper from "@/app/components/tooltipper";
import YesNo from "@/app/components/yes-no";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Label } from "@headlessui/react";
import React from "react";

export default function CharacterCredits() {
    return (
        <Section title="Credits" className="flex flex-col gap-4">
            <Field className="flex flex-row justify-between">
                <Label className="font-bold text-sm text-white/75">
                    Did you design this character?
                    <span className="text-red-500">*</span>
                </Label>
                <YesNo name="designer" />
            </Field>
            <Field className="flex flex-row justify-between">
                <Label className="font-bold text-sm text-white/75">
                    Link a species sheet?
                    <span className="text-red-500">*</span>
                </Label>
                <YesNo name="species_source" />
            </Field>
            <Field className="flex flex-col gap-2">
                <MarkdownBox
                    name="credits"
                    label={
                        <>
                            <span className="font-bold text-sm text-white/75">
                                Additional Credits
                            </span>
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
                                    <p>
                                        You can add any additional sources for
                                        credit here.
                                    </p>
                                }
                            />
                        </>
                    }
                />
            </Field>
        </Section>
    );
}
