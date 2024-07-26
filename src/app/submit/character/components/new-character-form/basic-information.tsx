"use client";

import MarkdownBox from "@/app/components/markdown-box";
import { Section } from "@/app/components/section";
import Tooltipper from "@/app/components/tooltipper";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Input, Label } from "@headlessui/react";
import React from "react";

export default function CharacterBasicInformation() {
    return (
        <Section title="Basic Information" className="flex flex-col gap-4">
            <Field className="flex flex-col gap-2">
                <Label className="font-bold text-sm text-white/75">
                    <span>Name</span>
                    <span className="text-red-500">*</span>
                </Label>
                <Input name="name" required />
            </Field>
            <Field>
                <MarkdownBox
                    label={
                        <span className="font-bold text-sm text-white/75">
                            Description
                        </span>
                    }
                    name="description"
                />
            </Field>
            <Field>
                <MarkdownBox
                    label={
                        <span className="font-bold text-sm text-white/75">
                            Permissions
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
                                        Specific dos and don&apos;ts that an
                                        attacker should keep in mind when
                                        drawing this character.
                                    </p>
                                }
                            />
                        </span>
                    }
                    name="permissions"
                />
            </Field>
            <Field className="flex flex-row gap-2">
                <Input type="checkbox" name="disable_global_user_permissions" />
                <span>
                    <Label className="font-bold text-sm text-white/75">
                        Disable global user permissions
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
                            <p>
                                If this is checked, the general permissions you
                                have set in user settings will not be displayed
                                on this character&apos;s page. In other words,
                                this character is an exception to those rules.
                            </p>
                        }
                    />
                </span>
            </Field>
            <div className="font-bold text-sm text-white/75 cursor-default">
                <span>External Link</span>
            </div>
            <div className="grid grid-cols-2">
                <Field className="flex flex-col gap-2">
                    <Label className="font-bold text-xs text-white/75">
                        Name
                    </Label>
                    <Input
                        name="external_link_name"
                        className="rounded-r-none"
                    />
                </Field>
                <Field className="flex flex-col gap-2">
                    <Label className="font-bold text-xs text-white/75">
                        URL
                    </Label>
                    <Input
                        name="external_link_url"
                        className="rounded-l-none"
                    />
                </Field>
            </div>
            <Field className="flex flex-row gap-2">
                <Input type="checkbox" name="disable_global_user_permissions" />
                <span>
                    <Label className="font-bold text-sm text-white/75">
                        Disable commenting on this character&apos;s page
                    </Label>
                </span>
            </Field>
        </Section>
    );
}
