import MarkdownBox from "@/app/components/markdown-box";
import { Card } from "@/app/components/card";
import YesNo, { YesNoType } from "@/app/components/yes-no";
import React, { useState } from "react";
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
    defaults?: {
        isDesigner: boolean | undefined;
        designerName: string | undefined;
        designerUrl: string | undefined;
        doesLinkSpeciesSheet: boolean | undefined;
        speciesName: string | undefined;
        speciesSheetUrl: string | undefined;
        additionalCredits: string | undefined;
    };
    errors?: CharacterCreditsErrors;
    form?: string;
}) {
    const [is_designer, setIsDesigner] = useState<YesNoType | undefined>(
        props.defaults?.isDesigner !== undefined
            ? props.defaults.isDesigner
                ? "yes"
                : "no"
            : undefined
    );
    const [does_link_species_sheet, setDoesLinkSpeciesSheet] = useState<
        YesNoType | undefined
    >(
        props.defaults?.doesLinkSpeciesSheet !== undefined
            ? props.defaults.doesLinkSpeciesSheet
                ? "yes"
                : "no"
            : undefined
    );

    return (
        <Card title="Credits">
            <div className="flex flex-col gap-4">
                <ErrorList errors={props.errors?.general} />
                <div className="yes-no">
                    <Label htmlFor="is_designer" className="required">
                        Did you design this character?
                    </Label>

                    <YesNo
                        id="is_designer"
                        name="is_designer"
                        value={is_designer}
                        onChange={setIsDesigner}
                        form={props.form}
                    />
                </div>
                <ErrorList errors={props.errors?.is_designer} />
                {is_designer === "no" ? (
                    <div className="link-input">
                        <div>
                            <Label htmlFor="designer_name" className="required">
                                Designer Name
                            </Label>
                            <ErrorList errors={props.errors?.designer_name} />
                            <input
                                id="designer_name"
                                name="designer_name"
                                form={props.form}
                                required
                                defaultValue={props.defaults?.designerName}
                            />
                        </div>
                        <div>
                            <Label htmlFor="designer_url" className="required">
                                Designer URL
                            </Label>
                            <ErrorList errors={props.errors?.designer_url} />
                            <input
                                id="designer_url"
                                name="designer_url"
                                form={props.form}
                                required
                                defaultValue={props.defaults?.designerUrl}
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
                            form={props.form}
                        />
                        <input
                            hidden
                            type="hidden"
                            name="designer_url"
                            value=""
                            readOnly
                            form={props.form}
                        />
                    </>
                )}
                <div className="yes-no">
                    <Label
                        htmlFor="does_link_species_sheet"
                        className="required"
                    >
                        Link a species sheet?
                    </Label>
                    <YesNo
                        id="does_link_species_sheet"
                        name="does_link_species_sheet"
                        value={does_link_species_sheet}
                        onChange={setDoesLinkSpeciesSheet}
                        form={props.form}
                    />
                </div>
                <ErrorList errors={props.errors?.does_link_species_sheet} />
                {does_link_species_sheet === "yes" ? (
                    <div className="link-input">
                        <div>
                            <Label htmlFor="species_name" className="required">
                                Species Name
                            </Label>
                            <ErrorList errors={props.errors?.species_name} />
                            <input
                                id="species_name"
                                name="species_name"
                                form={props.form}
                                required
                                defaultValue={props.defaults?.speciesName}
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="species_sheet_url"
                                className="required"
                            >
                                URL for Species Sheet
                            </Label>
                            <ErrorList
                                errors={props.errors?.species_sheet_url}
                            />
                            <input
                                id="species_sheet_url"
                                name="species_sheet_url"
                                form={props.form}
                                required
                                defaultValue={props.defaults?.speciesSheetUrl}
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
                            form={props.form}
                        />
                        <input
                            hidden
                            type="hidden"
                            name="species_sheet_url"
                            value=""
                            readOnly
                            form={props.form}
                        />
                    </>
                )}
                <div className="flex flex-col gap-2">
                    <MarkdownBox
                        name="additional_credits"
                        label={
                            <>
                                <Label className="font-bold text-sm text-white/75 block">
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
                                </Label>
                                <ErrorList
                                    errors={props.errors?.additional_credits}
                                />
                            </>
                        }
                        form={props.form}
                        defaultValue={props.defaults?.additionalCredits}
                    />
                </div>
            </div>
        </Card>
    );
}
