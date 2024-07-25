"use client";

import { changeAvatar } from "@/app/actions";
import { Section } from "@/app/components/section";
import { Button, Field, Input, Label } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { ErrorList } from "./error-list";

type ChangeAvatarProps = {
    imageUrl: string;
};

export default function ChangeAvatar({ imageUrl }: ChangeAvatarProps) {
    const [state, action] = useFormState(changeAvatar, {});

    const [avatar, setAvatar] = useState(imageUrl);

    if (state.newImageUrl && avatar !== state.newImageUrl) {
        setAvatar(state.newImageUrl);
    }

    return (
        <Section title={<h4>Change Avatar</h4>}>
            <div>
                {state.success ? (
                    <h5 className="text-green-400">Avatar updated!</h5>
                ) : (
                    <ErrorList errors={state.errors?.image} />
                )}
            </div>
            <form className="flex flex-col items-center" action={action}>
                <Image src={avatar} alt="avatar" width="96" height="96" />
                <Field className="flex flex-col w-full">
                    <Label className="text-sm text-white/50">Choose File</Label>
                    <Input
                        name="image"
                        type="file"
                        className="border-2 border-gray-500 rounded-lg p-1"
                    />
                    <p className="text-sm">
                        <span>.gif, .jpg, or .png files only.</span>
                        <br />
                        <span>
                            <strong>Required size:</strong>
                            <span> 100x100 pixels or smaller</span>
                        </span>
                    </p>
                </Field>
                <Button
                    className="self-end rounded-lg bg-cyan-600 p-2"
                    type="submit"
                >
                    Upload
                </Button>
            </form>
        </Section>
    );
}
