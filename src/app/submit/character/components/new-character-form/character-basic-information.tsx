"use client";

import MarkdownBox from "@/app/components/markdown-box";
import { Card } from "@/app/components/card";
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
        <Card title="Basic Information">
            <div className="flex-col-4">
                <ErrorList errors={props.errors?.general} />
                <div className="flex-col-2">
                    <Label htmlFor="name" className="required">
                        Name
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
                        label={<Label>Description</Label>}
                        defaultValue={props.defaults?.description}
                    />
                </div>
                <div>
                    <MarkdownBox
                        label={
                            <>
                                <Label>
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
                                </Label>
                                <ErrorList errors={props.errors?.permissions} />
                            </>
                        }
                        name="permissions"
                        form={props.form}
                        defaultValue={props.defaults?.permissions}
                    />
                </div>
                <div className="flex-row-2-center">
                    <CheckboxFix
                        id="disable_global_user_permissions"
                        name="disable_global_user_permissions"
                        form={props.form}
                        defaultChecked={
                            props.defaults?.disableGlobalUserPermissions
                        }
                    >
                        <CheckboxIndicator>
                            <Icon icon={faCheck.fas} className="text-black" />
                        </CheckboxIndicator>
                    </CheckboxFix>
                    <Label htmlFor="disable_global_user_permissions">
                        <span>Disable global user permissions</span>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger className="mx-2">
                                <Icon icon={faQuestionCircle.fas} />
                            </TooltipTrigger>
                            <TooltipContent>
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
                <Label>External Link</Label>
                <div className="link-input">
                    <div>
                        <Label htmlFor="external_link_name">Name</Label>
                        <ErrorList errors={props.errors?.external_link_name} />
                        <input
                            id="external_link_name"
                            name="external_link_name"
                            form={props.form}
                            defaultValue={props.defaults?.externalLinkName}
                        />
                    </div>
                    <div>
                        <Label htmlFor="external_link_url">Url</Label>
                        <ErrorList errors={props.errors?.external_link_url} />
                        <input
                            id="external_link_url"
                            name="external_link_url"
                            form={props.form}
                            defaultValue={props.defaults?.externalLinkUrl}
                        />
                    </div>
                </div>
                <div className="flex-row-2-center">
                    <CheckboxFix
                        id="disable_comments"
                        name="disable_comments"
                        form={props.form}
                        defaultChecked={props.defaults?.disableComments}
                    >
                        <CheckboxIndicator>
                            <Icon icon={faCheck.fas} className="text-black" />
                        </CheckboxIndicator>
                    </CheckboxFix>
                    <Label htmlFor="disable_comments">
                        <span>
                            Disable commenting on this character&apos;s page
                        </span>
                    </Label>
                </div>
            </div>
        </Card>
    );
}
