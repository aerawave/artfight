"use client";

import React, { useState } from "react";

import { Section } from "@/app/components/section";
import { useFormState } from "react-dom";
import { ErrorList } from "./error-list";
import { changeEmail } from "@/app/actions";
import { Label } from "@radix-ui/react-label";

type ChangeEmailProps = {
    email: string;
};

export default function ChangeEmail({ email }: ChangeEmailProps) {
    const [state, action] = useFormState(changeEmail, {});
    const [new_email, setNewEmail] = useState("");
    const [email_confirmation, setEmailConfirmation] = useState("");

    return (
        <Section title={<h4>Change Email Address</h4>}>
            <div className="flex flex-col gap-2">
                <div>
                    {state.success ? (
                        <h5 className="text-green-400">Email added!</h5>
                    ) : (
                        <ErrorList errors={state.errors?.email} />
                    )}
                </div>
                <div className="p-4 bg-orange-500/75 text-white/90 rounded-md mb-4">
                    <p>
                        You will be required to verify your new email by
                        clicking a link in an email sent to your new address.
                    </p>
                </div>
                <form className="flex flex-col gap-4" action={action}>
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="current_password"
                            className="text-sm text-white/50"
                        >
                            Current Email Address
                        </Label>
                        <input
                            id="current_password"
                            name="current"
                            disabled
                            value={email}
                            className="p-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="email"
                            className="text-sm text-white/50"
                        >
                            New Email Address
                        </Label>
                        <input
                            id="email"
                            name="email"
                            value={new_email}
                            onChange={(e) => setNewEmail(e.currentTarget.value)}
                            className="p-2 rounded-md border-white/15 border-2 bg-white/5"
                            disabled
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label
                            htmlFor="email_confirmation"
                            className="text-sm text-white/50"
                        >
                            Confirm New Email Address
                        </Label>
                        <input
                            id="email_confirmation"
                            name="email_confirmation"
                            value={email_confirmation}
                            onChange={(e) =>
                                setEmailConfirmation(e.currentTarget.value)
                            }
                            className="p-2 rounded-md border-white/15 border-2 bg-white/5"
                            disabled
                        />
                    </div>
                    <button
                        className="self-end rounded-lg bg-cyan-600 p-2"
                        type="submit"
                        disabled
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Section>
    );
}
