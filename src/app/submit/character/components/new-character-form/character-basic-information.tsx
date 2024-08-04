"use client";

import MarkdownBox from "@/app/components/markdown-box";
import { Section } from "@/app/components/section";
import React from "react";
import { CharacterBasicInformationErrors } from "@/app/actions/errors/submissions-errors";
import { ErrorList } from "@/app/user/settings/components/user-settings/error-list";
import { Label } from "@radix-ui/react-label";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Icon from "@/app/components/icon";
import { faCheck, faQuestionCircle } from "@/app/components/icons";
import { CheckboxIndicator } from "@radix-ui/react-checkbox";
import CheckboxFix from "@/app/components/checkbox-fix";

export default function CharacterBasicInformation(props: {
    defaults?: {
        name: string | undefined;
        description: string | undefined;
        permissions: string | undefined;
        disableGlobalUserPermissions: boolean | undefined;
        externalLinkName: string | undefined;
        externalLinkUrl: string | undefined;
        disableComments: boolean | undefined;
    };
    errors?: CharacterBasicInformationErrors;
    form?: string;
}) {
    return (
        <Section title="Basic Information">
            <div className="flex flex-col gap-4">
                <ErrorList errors={props.errors?.general} />
                <div className="flex flex-col gap-2">
                    <Label
                        htmlFor="name"
                        className="font-bold text-sm text-white/75"
                    >
                        Name
                        <span className="text-red-500">*</span>
                    </Label>
                    <input
                        id="name"
                        name="name"
                        required
                        form={props.form}
                        defaultValue={props.defaults?.name}
                    />
                </div>
                {/* TODO: add slug field */}
                <div>
                    <ErrorList errors={props.errors?.description} />
                    <MarkdownBox
                        name="description"
                        form={props.form}
                        label={
                            <span className="font-bold text-sm text-white/75 block">
                                Description
                            </span>
                        }
                        defaultValue={props.defaults?.description}
                    />
                </div>
                <div>
                    <MarkdownBox
                        label={
                            <>
                                <span className="font-bold text-sm text-white/75 block">
                                    Permissions
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger className="mx-1">
                                            <Icon icon={faQuestionCircle.fas} />
                                        </TooltipTrigger>
                                        <TooltipContent className="w-40 text-center text-xs p-2 rounded-lg bg-black text-white border-white/20 border">
                                            <p>
                                                Specific dos and don&apos;ts
                                                that an attacker should keep in
                                                mind when drawing this
                                                character.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </span>
                                <ErrorList errors={props.errors?.permissions} />
                            </>
                        }
                        name="permissions"
                        form={props.form}
                        defaultValue={props.defaults?.permissions}
                    />
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <CheckboxFix
                        id="disable_global_user_permissions"
                        name="disable_global_user_permissions"
                        form={props.form}
                        className="shadow-blackA4 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
                        defaultChecked={
                            props.defaults?.disableGlobalUserPermissions
                        }
                    >
                        <CheckboxIndicator>
                            <Icon icon={faCheck.fas} className="text-black" />
                        </CheckboxIndicator>
                    </CheckboxFix>
                    <Label
                        htmlFor="disable_global_user_permissions"
                        className="font-bold text-sm text-white/75"
                    >
                        <span>Disable global user permissions</span>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger className="mx-2">
                                <Icon icon={faQuestionCircle.fas} />
                            </TooltipTrigger>
                            <TooltipContent className="w-40 text-center text-xs p-2 rounded-lg bg-black text-white border-white/20 border">
                                <p>
                                    If this is checked, the general permissions
                                    you have set in user settings will not be
                                    displayed on this character&apos;s page. In
                                    other words, this character is an exception
                                    to those rules.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </Label>
                </div>
                <div className="font-bold text-sm text-white/75 cursor-default">
                    <span>Exteranl Link</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="external_link_name"
                            className="font-bold text-xs text-white/75"
                        >
                            Name
                        </Label>
                        <ErrorList errors={props.errors?.external_link_name} />
                        <input
                            id="external_link_name"
                            name="external_link_name"
                            className="md:rounded-r-none"
                            form={props.form}
                            defaultValue={props.defaults?.externalLinkName}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="external_link_url"
                            className="font-bold text-xs text-white/75"
                        >
                            Url
                        </Label>
                        <ErrorList errors={props.errors?.external_link_url} />
                        <input
                            id="external_link_url"
                            name="external_link_url"
                            className="md:rounded-l-none"
                            form={props.form}
                            defaultValue={props.defaults?.externalLinkUrl}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <CheckboxFix
                        id="disable_comments"
                        name="disable_comments"
                        form={props.form}
                        className="shadow-blackA4 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
                        defaultChecked={props.defaults?.disableComments}
                    >
                        <CheckboxIndicator>
                            <Icon icon={faCheck.fas} className="text-black" />
                        </CheckboxIndicator>
                    </CheckboxFix>
                    <Label
                        htmlFor="disable_comments"
                        className="font-bold text-sm text-white/75"
                    >
                        <span>
                            Disable commenting on this character&apos;s page
                        </span>
                    </Label>
                </div>
            </div>
        </Section>
    );
}
