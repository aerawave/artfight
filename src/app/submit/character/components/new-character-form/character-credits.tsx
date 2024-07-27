import MarkdownBox from "@/app/components/markdown-box";
import { Section } from "@/app/components/section";
import Tooltipper from "@/app/components/tooltipper";
import YesNo, { YesNoType } from "@/app/components/yes-no";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Input, Label } from "@headlessui/react";
import React, { useState } from "react";
import { NEW_CHARACTER_FORM } from "../new-character-form";
import { CharacterCreditsErrors } from "@/app/actions/errors/submissions-errors";
import { ErrorList } from "@/app/user/settings/components/user-settings/error-list";

export default function CharacterCredits(props: {
    errors?: CharacterCreditsErrors;
}) {
    const [is_designer, setIsDesigner] = useState<YesNoType | undefined>();
    const [does_link_species_sheet, setDoesLinkSpeciesSheet] = useState<
        YesNoType | undefined
    >();

    return (
        <Section title="Credits" className="flex flex-col gap-4">
            <ErrorList errors={props.errors?.general} />
            <Field>
                <div className="flex flex-row justify-between items-center">
                    <Label className="font-bold text-sm text-white/75">
                        Did you design this character?
                        <span className="text-red-500">*</span>
                    </Label>
                    <YesNo
                        name="is_designer"
                        value={is_designer}
                        onChange={setIsDesigner}
                        form={NEW_CHARACTER_FORM}
                    />
                </div>
                <ErrorList errors={props.errors?.is_designer} />
            </Field>
            {is_designer === "no" ? (
                <div className="flex flex-col gap-2 rounded-lg p-2 bg-white/10">
                    <Field className="flex flex-col gap-2">
                        <Label className="font-bold text-sm text-white/75">
                            Designer Name
                            <span className="text-red-500">*</span>
                        </Label>
                        <ErrorList errors={props.errors?.designer_name} />
                        <Input
                            name="designer_name"
                            form={NEW_CHARACTER_FORM}
                            required
                        />
                    </Field>
                    <Field className="flex flex-col gap-2">
                        <Label className="font-bold text-sm text-white/75">
                            Designer URL
                            <span className="text-red-500">*</span>
                        </Label>
                        <ErrorList errors={props.errors?.designer_url} />
                        <Input
                            name="designer_url"
                            form={NEW_CHARACTER_FORM}
                            required
                        />
                    </Field>
                </div>
            ) : (
                <>
                    <input
                        hidden
                        type="hidden"
                        name="designer_name"
                        value=""
                        readOnly
                        form={NEW_CHARACTER_FORM}
                    />
                    <input
                        hidden
                        type="hidden"
                        name="designer_url"
                        value=""
                        readOnly
                        form={NEW_CHARACTER_FORM}
                    />
                </>
            )}
            <Field>
                <div className="flex flex-row justify-between">
                    <Label className="font-bold text-sm text-white/75">
                        Link a species sheet?
                        <span className="text-red-500">*</span>
                    </Label>
                    <YesNo
                        name="does_link_species_sheet"
                        value={does_link_species_sheet}
                        onChange={setDoesLinkSpeciesSheet}
                        form={NEW_CHARACTER_FORM}
                    />
                </div>
                <ErrorList errors={props.errors?.does_link_species_sheet} />
            </Field>
            {does_link_species_sheet === "yes" ? (
                <div className="flex flex-col gap-2 rounded-lg p-2 bg-white/10">
                    <Field className="flex flex-col gap-2">
                        <Label className="font-bold text-sm text-white/75">
                            Species Name
                            <span className="text-red-500">*</span>
                        </Label>
                        <ErrorList errors={props.errors?.species_name} />
                        <Input
                            name="species_name"
                            form={NEW_CHARACTER_FORM}
                            required
                        />
                    </Field>
                    <Field className="flex flex-col gap-2">
                        <Label className="font-bold text-sm text-white/75">
                            URL for Species Sheet
                            <span className="text-red-500">*</span>
                        </Label>
                        <ErrorList errors={props.errors?.species_sheet_url} />
                        <Input
                            name="species_sheet_url"
                            form={NEW_CHARACTER_FORM}
                            required
                        />
                    </Field>
                </div>
            ) : (
                <>
                    <input
                        hidden
                        type="hidden"
                        name="species_name"
                        value=""
                        readOnly
                        form={NEW_CHARACTER_FORM}
                    />
                    <input
                        hidden
                        type="hidden"
                        name="species_sheet_url"
                        value=""
                        readOnly
                        form={NEW_CHARACTER_FORM}
                    />
                </>
            )}
            <Field className="flex flex-col gap-2">
                <MarkdownBox
                    name="additional_credits"
                    label={
                        <>
                            <span className="font-bold text-sm text-white/75 block">
                                Additional Credits
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
                                            You can add any additional sources
                                            for credit here.
                                        </p>
                                    }
                                />
                            </span>
                            <ErrorList
                                errors={props.errors?.additional_credits}
                            />
                        </>
                    }
                    form={NEW_CHARACTER_FORM}
                />
            </Field>
        </Section>
    );
}
