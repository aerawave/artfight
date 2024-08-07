"use client";

import React, { useState } from "react";

import { Card } from "@/app/components/card";
import { useFormState } from "react-dom";
import { ErrorList } from "./error-list";
import { changeEmail } from "@/app/actions";
import { Label } from "@radix-ui/react-label";
import SubmitButton from "@/app/components/submit-button";
import Alert from "@/app/components/alert";

type ChangeEmailProps = {
    email: string;
};

export default function ChangeEmail({ email }: ChangeEmailProps) {
    const [state, action] = useFormState(changeEmail, {});
    const [new_email, setNewEmail] = useState("");
    const [email_confirmation, setEmailConfirmation] = useState("");

    return (
        <Card title={<h4>Change Email Address</h4>}>
            <div className="flex-col-2">
                <div>
                    {state.success ? (
                        <h5 className="text-green-400">Email added!</h5>
                    ) : (
                        <ErrorList errors={state.errors?.email} />
                    )}
                </div>
                <Alert variant="warning">
                    You will be required to verify your new email by clicking a
                    link in an email sent to your new address.
                </Alert>
                <form className="flex-col-4" action={action}>
                    <div className="flex-col-2">
                        <Label htmlFor="current_password">
                            Current Email Address
                        </Label>
                        <input
                            id="current_password"
                            name="current"
                            disabled
                            value={email}
                        />
                    </div>
                    <div className="flex-col-2">
                        <Label htmlFor="email">New Email Address</Label>
                        <input
                            id="email"
                            name="email"
                            value={new_email}
                            onChange={(e) => setNewEmail(e.currentTarget.value)}
                            disabled
                        />
                    </div>
                    <div className="flex-col-2">
                        <Label htmlFor="email_confirmation">
                            Confirm New Email Address
                        </Label>
                        <input
                            id="email_confirmation"
                            name="email_confirmation"
                            value={email_confirmation}
                            onChange={(e) =>
                                setEmailConfirmation(e.currentTarget.value)
                            }
                            disabled
                        />
                    </div>
                    <div className="self-end">
                        <SubmitButton disabled />
                    </div>
                </form>
            </div>
        </Card>
    );
}
