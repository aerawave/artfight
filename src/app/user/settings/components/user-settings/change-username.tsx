"use client";

import React from "react";

import { Section } from "@/app/components/section";
import { useState } from "react";
import { useFormState } from "react-dom";
import { ErrorList } from "./error-list";
import { changeUsername } from "@/app/actions";
import { Button, Field, Input, Label } from "@headlessui/react";

type ChangeUsernameProps = {
    className?: string;
    username: string;
    checkAvailability: (username: string) => Promise<[boolean, string]>;
};

type UsernameAvailability = "available" | "unavailable" | "unchecked";

export default function ChangeUsername({
    className,
    username: usernameInitial,
    checkAvailability,
}: ChangeUsernameProps) {
    const [state, action] = useFormState(changeUsername, {});
    const [username, setUsername] = useState("");
    const [checked_username, setCheckedUsername] = useState("");
    const [check, setCheck] = useState<UsernameAvailability>("unchecked");
    const [check_message, setCheckMessage] = useState("");

    if (state.success && !state.cleared) {
        state.cleared = true;
        setUsername("");
        usernameInitial = username;
    }

    return (
        <Section className={className} title={<h4>Change Username</h4>}>
            <div>
                {state.success ? (
                    <h5 className="text-green-400">Username updated!</h5>
                ) : (
                    <ErrorList errors={state.errors?.username} />
                )}
            </div>
            <form
                className="flex flex-col gap-4"
                action={async (data) => {
                    setCheck("unchecked");
                    action(data);
                }}
            >
                <Field className="flex flex-row">
                    <Label className="text-sm text-white/50 mr-2">
                        Current Username:
                    </Label>
                    <span className="text-sm">{usernameInitial}</span>
                </Field>
                <Field className="flex flex-col">
                    <Label className="text-sm text-white/50">
                        New Username
                    </Label>
                    <div className="flex flex-row">
                        <Input
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.currentTarget.value)}
                            className="flex-grow"
                        />
                        <Button
                            className="rounded-lg ml-2 bg-cyan-600 p-2"
                            onClick={async () => {
                                const [available, message] =
                                    await checkAvailability(username);

                                setCheckedUsername(username);
                                setCheck(
                                    available ? "available" : "unavailable"
                                );
                                setCheckMessage(message);
                            }}
                        >
                            Check Availability
                        </Button>
                    </div>
                </Field>
                <div className="flex flex-row justify-between">
                    <span
                        className={`inline-block ${
                            check === "unavailable"
                                ? "text-red-500"
                                : "text-green-500"
                        }`}
                    >
                        {check !== "unchecked" && <>{check_message}</>}
                    </span>
                    <Button
                        className="rounded-lg bg-cyan-600 p-2"
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Section>
    );
}
