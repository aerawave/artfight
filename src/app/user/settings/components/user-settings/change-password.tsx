"use client";

import React, { useState } from "react";
import { Button, Field, Input, Label } from "@headlessui/react";
import { useFormState } from "react-dom";
import { changePassword } from "@/app/actions";
import { ErrorList } from "./error-list";
import { Section } from "@/app/components/section";

type ChangePasswordProps = {
    provideErrors?: string[];
};

export default function ChangePassword({ provideErrors }: ChangePasswordProps) {
    const [errors, setErrors] = useState(provideErrors ?? []);
    const [state, action] = useFormState(changePassword, {});

    const [old_password, setOldPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");

    if (state.success && !state.cleared) {
        setOldPassword("");
        setNewPassword("");
        setPasswordConfirmation("");
        state.cleared = true;
    }

    return (
        <Section title={<h4>Change Password</h4>}>
            <div>
                {state.success ? (
                    <h5 className="text-green-400">Password updated!</h5>
                ) : (
                    state.errors?.verification &&
                    state.errors.verification.map((err, i) => (
                        <div key={i} className="text-red-500">
                            * {err}
                        </div>
                    ))
                )}
            </div>
            <form
                className="flex flex-col gap-4"
                action={(data) => {
                    const [new_password, password_confirmation] = [
                        data.get("password"),
                        data.get("password_confirmation"),
                    ];
                    if (new_password !== password_confirmation) {
                        setErrors(["Passwords do not match."]);
                        return;
                    } else {
                        setErrors([]);
                    }

                    action(data);
                }}
            >
                <Field className="flex flex-col">
                    <Label className="text-sm text-white/50">
                        Old Password
                    </Label>
                    <Input
                        name="old_password"
                        type="password"
                        className="text-black"
                        value={old_password}
                        onChange={(e) => setOldPassword(e.currentTarget.value)}
                    />
                    <ErrorList errors={state.errors?.old_password} />
                </Field>
                <Field className="flex flex-col">
                    <Label className="text-sm text-white/50">
                        New Password
                    </Label>
                    <Input
                        name="password"
                        type="password"
                        className="text-black"
                        value={new_password}
                        onChange={(e) => setNewPassword(e.currentTarget.value)}
                    />
                    <ErrorList errors={state.errors?.new_password} />
                </Field>
                <Field className="flex flex-col">
                    <Label className="text-sm text-white/50">
                        Confirm New Password
                    </Label>
                    <Input
                        name="password_confirmation"
                        type="password"
                        className="text-black"
                        value={password_confirmation}
                        onChange={(e) =>
                            setPasswordConfirmation(e.currentTarget.value)
                        }
                    />
                </Field>
                <ErrorList errors={errors} />
                <Button
                    className="self-end rounded-lg bg-cyan-600 p-2"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Section>
    );
}
