import MarkdownBox from "@/app/components/markdown-box";
import { Section } from "@/app/components/section";
import YesNo, { YesNoType } from "@/app/components/yes-no";
import React, { useState } from "react";
import { NEW_CHARACTER_FORM } from "../new-character-form";
import { CharacterCreditsErrors } from "@/app/actions/errors/submissions-errors";
import { ErrorList } from "@/app/user/settings/components/user-settings/error-list";
import { Label } from "@radix-ui/react-label";
import { faQuestionCircle } from "@/app/components/icons";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Icon from "@/app/components/icon";

export default function CharacterCredits(props: {
    errors?: CharacterCreditsErrors;
}) {
    const [is_designer, setIsDesigner] = useState<YesNoType | undefined>();
    const [does_link_species_sheet, setDoesLinkSpeciesSheet] = useState<
        YesNoType | undefined
    >();

    return (
        <Section title="Credits">
            <div className="flex flex-col gap-4">
                <ErrorList errors={props.errors?.general} />
                <div className="flex flex-row justify-between items-center">
                    <Label
                        htmlFor="is_designer"
                        className="font-bold text-sm text-white/75"
                    >
                        Did you design this character?
                        <span className="text-red-500">*</span>
                    </Label>

                    <YesNo
                        id="is_designer"
                        name="is_designer"
                        value={is_designer}
                        onChange={setIsDesigner}
                        form={NEW_CHARACTER_FORM}
                    />
                </div>
                <ErrorList errors={props.errors?.is_designer} />
                {is_designer === "no" ? (
                    <div className="flex flex-col gap-2 rounded-lg p-2 bg-white/10">
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="designer_name"
                                className="font-bold text-sm text-white/75"
                            >
                                Designer Name
                                <span className="text-red-500">*</span>
                            </Label>
                            <ErrorList errors={props.errors?.designer_name} />
                            <input
                                id="designer_name"
                                name="designer_name"
                                form={NEW_CHARACTER_FORM}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="designer_url"
                                className="font-bold text-sm text-white/75"
                            >
                                Designer URL
                                <span className="text-red-500">*</span>
                            </Label>
                            <ErrorList errors={props.errors?.designer_url} />
                            <input
                                id="designer_url"
                                name="designer_url"
                                form={NEW_CHARACTER_FORM}
                                required
                            />
                        </div>
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
                <div className="flex flex-row justify-between">
                    <Label htmlFor="does_link_species_sheet">
                        Link a species sheet?
                        <span className="text-red-500">*</span>
                    </Label>
                    <YesNo
                        id="does_link_species_sheet"
                        name="does_link_species_sheet"
                        value={does_link_species_sheet}
                        onChange={setDoesLinkSpeciesSheet}
                        form={NEW_CHARACTER_FORM}
                    />
                </div>
                <ErrorList errors={props.errors?.does_link_species_sheet} />
                {does_link_species_sheet === "yes" ? (
                    <div className="flex flex-col gap-2 rounded-lg p-2 bg-white/10">
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="species_name"
                                className="font-bold text-sm text-white/75"
                            >
                                Species Name
                                <span className="text-red-500">*</span>
                            </Label>
                            <ErrorList errors={props.errors?.species_name} />
                            <input
                                id="species_name"
                                name="species_name"
                                form={NEW_CHARACTER_FORM}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="species_sheet_url"
                                className="font-bold text-sm text-white/75"
                            >
                                URL for Species Sheet
                                <span className="text-red-500">*</span>
                            </Label>
                            <ErrorList
                                errors={props.errors?.species_sheet_url}
                            />
                            <input
                                id="species_sheet_url"
                                name="species_sheet_url"
                                form={NEW_CHARACTER_FORM}
                                required
                            />
                        </div>
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
                <div className="flex flex-col gap-2">
                    <MarkdownBox
                        name="additional_credits"
                        label={
                            <>
                                <span className="font-bold text-sm text-white/75 block">
                                    Additional Credits
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger className="mx-1">
                                            <Icon icon={faQuestionCircle.fas} />
                                        </TooltipTrigger>
                                        <TooltipContent className="p-2 rounded-lg bg-black text-white border-white/20 border">
                                            <p>
                                                You can add any additional
                                                sources for credit here.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </span>
                                <ErrorList
                                    errors={props.errors?.additional_credits}
                                />
                            </>
                        }
                        form={NEW_CHARACTER_FORM}
                    />
                </div>
            </div>
        </Section>
    );
}
