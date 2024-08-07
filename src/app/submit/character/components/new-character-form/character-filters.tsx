import { ImageFilter } from "@/app/actions/user";
import { Card } from "@/app/components/card";
import YesNo, { YesNoType } from "@/app/components/yes-no";
import Link from "next/link";
import React, { useState } from "react";
import { filters } from "./filters";
import { CharacterFiltersErrors } from "@/app/actions/errors/submissions-errors";
import { ErrorList } from "@/app/user/settings/components/user-settings/error-list";
import { Label } from "@radix-ui/react-label";
import Icon from "@/app/components/icon";
import {
    faCheck,
    faQuestionCircle,
    faTriangleExclamation,
} from "@/app/components/icons";
import { CheckboxIndicator } from "@radix-ui/react-checkbox";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import CheckboxFix from "@/app/components/checkbox-fix";
import Alert from "@/app/components/alert";

export default function CharacterFilters(props: {
    defaults?: {
        neededFilters?: Record<ImageFilter, boolean | undefined>;
    };
    errors?: CharacterFiltersErrors;
    form?: string;
}) {
    const needed_filters = (props.defaults?.neededFilters ?? {}) as Record<
        ImageFilter,
        boolean | undefined
    >;

    const needs_filter = props.defaults
        ? Object.keys(props.defaults?.neededFilters ?? {}).some(
              (key) => needed_filters[key as ImageFilter] === true
          )
        : undefined;

    const [needs_filters, setNeedsFilters] = useState<YesNoType | undefined>(
        needs_filter !== undefined ? (needs_filter ? "yes" : "no") : undefined
    );

    return (
        <Card title="Character Filters">
            <div className="flex-col-4">
                <Alert variant="info">
                    <p>
                        Check the filters that apply to this character&apos;
                        description and other content on the profile.
                    </p>
                </Alert>
                <ErrorList errors={props.errors?.general} />
                <div className="yes-no">
                    <Label htmlFor="needs_filters" className="required">
                        Does this character need a content filter?
                    </Label>

                    <YesNo
                        id="needs_filters"
                        name="needs_filters"
                        value={needs_filters}
                        onChange={setNeedsFilters}
                        form={props.form}
                    />
                </div>
                <ErrorList errors={props.errors?.needs_filters} />
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
                        <hr className="hr-gray" />

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
                                <div key={key} className="flex-row-2-center">
                                    <CheckboxFix
                                        id={id}
                                        name={id}
                                        form={props.form}
                                        defaultChecked={
                                            needed_filters[key as ImageFilter]
                                        }
                                    >
                                        <CheckboxIndicator>
                                            <Icon
                                                icon={faCheck.fas}
                                                className="text-black"
                                            />
                                        </CheckboxIndicator>
                                    </CheckboxFix>
                                    <Label htmlFor={id}>
                                        <span>
                                            {filters[key as ImageFilter][0]}
                                        </span>
                                        <Tooltip delayDuration={0}>
                                            <TooltipTrigger className="mx-2">
                                                <Icon
                                                    icon={faQuestionCircle.fas}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent asChild>
                                                <p className="tooltip-content">
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
                                form={props.form}
                            />
                        ))}
                    </>
                )}
            </div>
        </Card>
    );
}
