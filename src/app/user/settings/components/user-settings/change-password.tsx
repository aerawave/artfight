"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import { changePassword } from "@/app/actions";
import { ErrorList } from "./error-list";
import { Section } from "@/app/components/section";
import { Label } from "@radix-ui/react-label";

type ChangePasswordProps = {
    className?: string;
    provideErrors?: string[];
};

export default function ChangePassword({
    className,
    provideErrors,
}: ChangePasswordProps) {
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
        <Section className={className} title={<h4>Change Password</h4>}>
            <div className="flex flex-col gap-2">
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
                    <div className="flex flex-col">
                        <Label
                            htmlFor="old_password"
                            className="text-sm text-white/50"
                        >
                            Old Password
                        </Label>
                        <input
                            id="old_password"
                            name="old_password"
                            type="password"
                            value={old_password}
                            onChange={(e) =>
                                setOldPassword(e.currentTarget.value)
                            }
                        />
                        <ErrorList errors={state.errors?.old_password} />
                    </div>
                    <div className="flex flex-col">
                        <Label
                            htmlFor="password"
                            className="text-sm text-white/50"
                        >
                            New Password
                        </Label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={new_password}
                            onChange={(e) =>
                                setNewPassword(e.currentTarget.value)
                            }
                        />
                        <ErrorList errors={state.errors?.new_password} />
                    </div>
                    <div className="flex flex-col">
                        <Label
                            htmlFor="password_confirmation"
                            className="text-sm text-white/50"
                        >
                            Confirm New Password
                        </Label>
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            value={password_confirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.currentTarget.value)
                            }
                        />
                    </div>
                    <ErrorList errors={errors} />
                    <button
                        className="self-end rounded-lg bg-cyan-600 p-2"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Section>
    );
}
