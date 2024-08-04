"use client";

import React, { useState } from "react";
import { Section } from "@/app/components/section";
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
        <Section title="Main Image">
            <div className="flex flex-col gap-4">
                <div className="rounded-md bg-orange-600 p-3 text-lg markdown text-white">
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
                </div>
                <ErrorList errors={props.errors?.general} />
                {!props.defaults?.imageId ? (
                    <>
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="main_image"
                                className="font-bold text-sm text-white/75"
                            >
                                Main Image
                                <span className="text-red-500">*</span>
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
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="thumbnail"
                                className="font-bold text-sm text-white/75"
                            >
                                Thumbnail Image
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger>
                                        <Icon icon={faQuestionCircle.fas} />
                                    </TooltipTrigger>
                                    <TooltipContent className="p-2 rounded-lg bg-black text-white border-white/20 border">
                                        <p>
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
                    <div className="rounded-md bg-red-500 p-3 markdown text-white">
                        <div className="flex flex-row gap-2 items-center">
                            <Icon icon={faTriangleExclamation.fas} />
                            <span>
                                Main image cannot be modified at this time.
                            </span>
                        </div>
                    </div>
                )}
                <div className="flex flex-row justify-between items-center">
                    <Label
                        htmlFor="is_artist"
                        className="font-bold text-sm text-white/75"
                    >
                        Did you create this image?
                        <span className="text-red-500">*</span>
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
                    <div className="flex flex-col gap-2 rounded-lg p-2 bg-white/10">
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="main_image_artist_name"
                                className="font-bold text-sm text-white/75"
                            >
                                Artist Name
                                <span className="text-red-500">*</span>
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
                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="main_image_artist_url"
                                className="font-bold text-sm text-white/75"
                            >
                                Artist URL
                                <span className="text-red-500">*</span>
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
                <div className="flex flex-row justify-between items-center">
                    <Label className="font-bold text-sm text-white/75">
                        Does this image need a content filter?
                        <span className="text-red-500">*</span>
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
                            const id = `main_image_${key}`;
                            return (
                                <div
                                    key={key}
                                    className="flex flex-row gap-2 items-center"
                                >
                                    <CheckboxFix
                                        id={id}
                                        name={id}
                                        form={props.form}
                                        className="shadow-blackA4 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
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
                                    <div>
                                        <Label
                                            htmlFor={id}
                                            className="font-bold text-sm text-white/75"
                                        >
                                            {filters[key as ImageFilter][0]}
                                        </Label>
                                        <Tooltip delayDuration={0}>
                                            <TooltipTrigger className="ml-2">
                                                <Icon
                                                    icon={faQuestionCircle.fas}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent className="p-2 rounded-lg bg-black text-white border-white/20 border">
                                                <p>
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
        </Section>
    );
}
