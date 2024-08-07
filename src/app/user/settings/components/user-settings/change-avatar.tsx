"use client";

import { changeAvatar } from "@/app/actions";
import { Card } from "@/app/components/card";
import Image from "next/image";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { ErrorList } from "./error-list";
import { Label } from "@radix-ui/react-label";
import SubmitButton from "@/app/components/submit-button";

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
        <Card title={<h4>Change Avatar</h4>}>
            <div>
                {state.success ? (
                    <h5 className="text-green-400">Avatar updated!</h5>
                ) : (
                    <ErrorList errors={state.errors?.image} />
                )}
            </div>
            <form className="flex-col-4 items-center" action={action}>
                <Image src={avatar} alt="avatar" width="96" height="96" />
                <div className="flex-col-2 w-full">
                    <Label htmlFor="avatar_image">Choose File</Label>
                    <input id="avatar_image" name="image" type="file" />
                    <p className="text-sm">
                        <span>.gif, .jpg, or .png files only.</span>
                        <br />
                        <span>
                            <strong>Required size:</strong>
                            <span> 100x100 pixels or smaller</span>
                        </span>
                    </p>
                </div>
                <div className="self-end">
                    <SubmitButton label="Upload" />
                </div>
            </form>
        </Card>
    );
}
