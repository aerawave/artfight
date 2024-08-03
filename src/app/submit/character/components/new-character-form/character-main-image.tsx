"use client";

import React, { useState } from "react";
import { Section } from "@/app/components/section";
import YesNo, { YesNoType } from "@/app/components/yes-no";
import Link from "next/link";
import { filters } from "./filters";
import { ImageFilter } from "@/app/actions/user";
import { NEW_CHARACTER_FORM } from "../new-character-form";
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
import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";

export default function CharacterMainImage(props: {
    errors?: CharacterMainImageErrors;
}) {
    const [is_artist, setIsArtist] = useState<YesNoType | undefined>(undefined);
    const [needs_filters, setNeedsFilters] = useState<YesNoType | undefined>(
        undefined
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
                        form={NEW_CHARACTER_FORM}
                    />
                    <p>
                        The uploaded image must be in .png, .jpg, or .gif format
                        and have a file size no larger than 5MB.
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
                                    If a thumbnail image is not provided, it
                                    will be cropped automatically from the main
                                    image. The thumbnail should represent the
                                    main image and not be a completely different
                                    image altogether.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </Label>
                    <input
                        id="thumbnail"
                        name="thumbnail"
                        type="file"
                        form={NEW_CHARACTER_FORM}
                    />
                    <p>
                        The thumbnail (if any) must be 200x200 in size. The
                        uploaded image must be in .png, .jpg, or .gif format.
                    </p>
                </div>

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
                        form={NEW_CHARACTER_FORM}
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
                                form={NEW_CHARACTER_FORM}
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
                                form={NEW_CHARACTER_FORM}
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
                            form={NEW_CHARACTER_FORM}
                        />
                        <input
                            hidden
                            type="hidden"
                            name="main_image_artist_url"
                            value=""
                            readOnly
                            form={NEW_CHARACTER_FORM}
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
                        form={NEW_CHARACTER_FORM}
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
                                form={NEW_CHARACTER_FORM}
                            />
                        ))}
                    </>
                )}
            </div>
        </Section>
    );
}
