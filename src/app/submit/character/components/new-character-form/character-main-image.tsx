"use client";

import React, { useState } from "react";
import { Section } from "@/app/components/section";
import { Field, Input, Label } from "@headlessui/react";
import Tooltipper from "@/app/components/tooltipper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faWarning } from "@fortawesome/free-solid-svg-icons";
import YesNo, { YesNoType } from "@/app/components/yes-no";
import Link from "next/link";
import { filters } from "./filters";
import { ImageFilter } from "@/app/actions/user";
import { NEW_CHARACTER_FORM } from "../new-character-form";
import { CharacterMainImageErrors } from "@/app/actions/errors/submissions-errors";
import { ErrorList } from "@/app/user/settings/components/user-settings/error-list";

export default function CharacterMainImage(props: {
    errors?: CharacterMainImageErrors;
}) {
    const [is_artist, setIsArtist] = useState<YesNoType | undefined>(undefined);
    const [needs_filters, setNeedsFilters] = useState<YesNoType | undefined>(
        undefined
    );

    return (
        <Section title="Main Image" className="flex flex-col gap-4">
            <div className="rounded-md bg-orange-600 p-3 text-lg markdown text-white">
                <p>
                    Please upload only images that you have permission to use,
                    and credit the original artist appropriately if you did not
                    create the image.
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
            <Field className="flex flex-col gap-2">
                <Label className="font-bold text-sm text-white/75">
                    Main Image
                    <span className="text-red-500">*</span>
                </Label>
                <Input
                    name="main_image"
                    type="file"
                    required
                    form={NEW_CHARACTER_FORM}
                />
                <p>
                    The uploaded image must be in .png, .jpg, or .gif format and
                    have a file size no larger than 5MB.
                </p>
            </Field>

            <Field className="flex flex-col gap-2">
                <Label className="font-bold text-sm text-white/75">
                    Thumbnail Image
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
                                If a thumbnail image is not provided, it will be
                                cropped automatically from the main image. The
                                thumbnail should represent the main image and
                                not be a completely different image altogether.
                            </p>
                        }
                    />
                </Label>
                <Input name="thumbnail" type="file" form={NEW_CHARACTER_FORM} />
                <p>
                    The thumbnail (if any) must be 200x200 in size. The uploaded
                    image must be in .png, .jpg, or .gif format.
                </p>
            </Field>

            <Field>
                <div className="flex flex-row justify-between items-center">
                    <Label className="font-bold text-sm text-white/75">
                        Did you create this image?
                        <span className="text-red-500">*</span>
                    </Label>
                    <YesNo
                        name="is_artist"
                        value={is_artist}
                        onChange={setIsArtist}
                        form={NEW_CHARACTER_FORM}
                    />
                </div>
                <ErrorList errors={props.errors?.is_artist} />
            </Field>

            {is_artist === "no" ? (
                <div className="flex flex-col gap-2 rounded-lg p-2 bg-white/10">
                    <Field className="flex flex-col gap-2">
                        <Label className="font-bold text-sm text-white/75">
                            Artist Name
                            <span className="text-red-500">*</span>
                        </Label>
                        <ErrorList
                            errors={props.errors?.main_image_artist_name}
                        />
                        <Input
                            name="main_image_artist_name"
                            form={NEW_CHARACTER_FORM}
                        />
                    </Field>
                    <Field className="flex flex-col gap-2">
                        <Label className="font-bold text-sm text-white/75">
                            Artist URL
                            <span className="text-red-500">*</span>
                        </Label>
                        <ErrorList
                            errors={props.errors?.main_image_artist_url}
                        />
                        <Input
                            name="main_image_artist_url"
                            form={NEW_CHARACTER_FORM}
                        />
                    </Field>
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

            <Field>
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
                                name={`main_image_${key}`}
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
                            name={`main_image_${key}`}
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
