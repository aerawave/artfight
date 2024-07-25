"use client";

import React from "react";

import { Section } from "@/app/components/section";
import { useState } from "react";
import { useFormState } from "react-dom";
import { ErrorList } from "./error-list";
import { changeUsername } from "@/app/actions";
import { Button, Field, Input, Label } from "@headlessui/react";
import Link from "next/link";

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
            <div className="p-4 bg-cyan-400/40 rounded-md mb-4">
                <div className="py-2">
                    <strong>Usernames:</strong>
                    <ul className="list-disc ml-8">
                        <li>can be maximum of 20 characters long</li>
                        <li>
                            may only contain letters (latin alphabet), numbers,
                            and underscores
                        </li>
                        <li>
                            must not use words that go against our{" "}
                            <Link
                                className="highlight"
                                href="/info/guide-filters"
                            >
                                Filter Guidelines
                            </Link>
                        </li>
                    </ul>
                </div>
                <p className="py-2">
                    <span>
                        All users are given 1 free username change when they
                        sign up, and will receive an additional free change once
                        a year on January 1st.
                    </span>
                    <br />
                    <span>
                        If you{" "}
                        <Link className="highlight" href="/donate">
                            donate
                        </Link>{" "}
                        $2+, you can receive additional username changes which
                        will be credited to your account once your donation is
                        processed.
                    </span>
                </p>
                <p className="py-6">
                    Your account can hold up to 12 username changes at a time,
                    and your username can only be changed once every 30 days.
                </p>
                <p>
                    Mnior changes such as capitalizations, 1-2 letter changes,
                    etc... can be changed for free by contacting anyone listed
                    on the{" "}
                    <Link className="highlight" href="/info/contact">
                        Contact Us
                    </Link>{" "}
                    page.
                </p>
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
