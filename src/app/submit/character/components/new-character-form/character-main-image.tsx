"use client";

import React, { useState } from "react";
import { Card } from "@/app/components/card";
import YesNo, { YesNoType } from "@/app/components/yes-no";
import Link from "next/link";
import { filters } from "./filters";
import { ImageFilter } from "@/app/actions/user";
import { CharacterMainImageErrors } from "@/app/actions/errors/submissions-errors";
import { ErrorList } from "@/app/user/settings/components/user-settings/error-list";
import { Label } from "@radix-ui/react-label";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Icon from "@/app/components/icon";
import {
    faCheck,
    faQuestionCircle,
    faTriangleExclamation,
} from "@/app/components/icons";
import { CheckboxIndicator } from "@radix-ui/react-checkbox";
import CheckboxFix from "@/app/components/checkbox-fix";
import Alert from "@/app/components/alert";

export default function CharacterMainImage(props: {
    defaults?: {
        imageId: number | undefined;
        isArtist: boolean | undefined;
        artistName: string | undefined;
        artistUrl: string | undefined;
        neededFilters: Record<ImageFilter, boolean | undefined> | undefined;
    };
    errors?: CharacterMainImageErrors;
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

    const [is_artist, setIsArtist] = useState<YesNoType | undefined>(
        props.defaults?.isArtist !== undefined
            ? props.defaults.isArtist
                ? "yes"
                : "no"
            : undefined
    );

    const [needs_filters, setNeedsFilters] = useState<YesNoType | undefined>(
        needs_filter !== undefined ? (needs_filter ? "yes" : "no") : undefined
    );

    return (
        <Card title="Main Image">
            <div className="flex-col-4">
                <Alert variant="warning">
                    <p>
                        Please upload only images that you have permission to
                        use, and credit the original artist appropriately if you
                        did not create the image.
                    </p>
                    <p>
                        Uploading a watermarked and/or low-resolution image is
                        recommended, to prevent art theft.
                    </p>
                    <p>
                        More images can be uploaded after the character has been
                        submitted.
                    </p>
                </Alert>
                <ErrorList errors={props.errors?.general} />
                {!props.defaults?.imageId ? (
                    <>
                        <div className="flex-col-2">
                            <Label htmlFor="main_image" className="required">
                                Main Image
                            </Label>
                            <input
                                id="main_image"
                                name="main_image"
                                type="file"
                                required
                                form={props.form}
                            />
                            <p>
                                The uploaded image must be in .png, .jpg, or
                                .gif format and have a file size no larger than
                                5MB.
                            </p>
                        </div>
                        <div className="flex-col-2">
                            <Label htmlFor="thumbnail">
                                Thumbnail Image
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger>
                                        <Icon icon={faQuestionCircle.fas} />
                                    </TooltipTrigger>
                                    <TooltipContent asChild>
                                        <p className="tooltip-content">
                                            If a thumbnail image is not
                                            provided, it will be cropped
                                            automatically from the main image.
                                            The thumbnail should represent the
                                            main image and not be a completely
                                            different image altogether.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </Label>
                            <input
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                form={props.form}
                            />
                            <p>
                                The thumbnail (if any) must be 200x200 in size.
                                The uploaded image must be in .png, .jpg, or
                                .gif format.
                            </p>
                        </div>
                    </>
                ) : (
                    <Alert variant="danger">
                        <div className="flex-row-2-center">
                            <Icon icon={faTriangleExclamation.fas} />
                            <span>
                                Main image cannot be modified at this time.
                            </span>
                        </div>
                    </Alert>
                )}
                <div className="yes-no">
                    <Label htmlFor="is_artist" className="required">
                        Did you create this image?
                    </Label>
                    <YesNo
                        id="is_artist"
                        name="is_artist"
                        value={is_artist}
                        onChange={setIsArtist}
                        form={props.form}
                    />
                </div>
                <ErrorList errors={props.errors?.is_artist} />
                {is_artist === "no" ? (
                    <div className="link-input">
                        <div>
                            <Label
                                htmlFor="main_image_artist_name"
                                className="required"
                            >
                                Artist Name
                            </Label>
                            <ErrorList
                                errors={props.errors?.main_image_artist_name}
                            />
                            <input
                                id="main_image_artist_name"
                                name="main_image_artist_name"
                                form={props.form}
                                defaultValue={props.defaults?.artistName}
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="main_image_artist_url"
                                className="required"
                            >
                                Artist URL
                            </Label>
                            <ErrorList
                                errors={props.errors?.main_image_artist_url}
                            />
                            <input
                                id="main_image_artist_url"
                                name="main_image_artist_url"
                                form={props.form}
                                defaultValue={props.defaults?.artistUrl}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <input
                            hidden
                            type="hidden"
                            name="main_image_artist_name"
                            value=""
                            readOnly
                            form={props.form}
                        />
                        <input
                            hidden
                            type="hidden"
                            name="main_image_artist_url"
                            value=""
                            readOnly
                            form={props.form}
                        />
                    </>
                )}
                <div className="yes-no">
                    <Label className="required">
                        Does this image need a content filter?
                    </Label>
                    <YesNo
                        name="main_image_needs_filters"
                        value={needs_filters}
                        onChange={setNeedsFilters}
                        form={props.form}
                    />
                </div>
                <ErrorList errors={props.errors?.main_image_needs_filters} />
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
                            const id = `main_image_${key}`;
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
                                            <Icon icon={faCheck.fas} />
                                        </CheckboxIndicator>
                                    </CheckboxFix>
                                    <div>
                                        <Label htmlFor={id}>
                                            {filters[key as ImageFilter][0]}
                                        </Label>
                                        <Tooltip delayDuration={0}>
                                            <TooltipTrigger className="ml-2">
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
                                    </div>
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
                                name={`main_image_${key}`}
                                hidden
                                readOnly
                                form={props.form}
                                defaultChecked={
                                    needed_filters[key as ImageFilter]
                                }
                            />
                        ))}
                    </>
                )}
            </div>
        </Card>
    );
}
