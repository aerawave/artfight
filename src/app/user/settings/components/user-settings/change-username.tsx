"use client";

import React from "react";

import { Section } from "@/app/components/section";
import { useState } from "react";
import { useFormState } from "react-dom";
import { ErrorList } from "./error-list";
import { changeUsername } from "@/app/actions";
import Link from "next/link";
import { Label } from "@radix-ui/react-label";
import SubmitButton from "@/app/components/submit-button";
import { clsx } from "@/app/util";

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
            <div className="flex-col-2">
                <div>
                    {state.success ? (
                        <h5 className="text-green-400">Username updated!</h5>
                    ) : (
                        <ErrorList errors={state.errors?.username} />
                    )}
                </div>
                <div className="deformat alert-cyan felx-col-2">
                    <div>
                        <strong>Usernames:</strong>
                        <ul>
                            <li>can be maximum of 20 characters long</li>
                            <li>
                                may only contain letters (latin alphabet),
                                numbers, and underscores
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
                            sign up, and will receive an additional free change
                            once a year on January 1st.
                        </span>
                        <br />
                        <span>
                            If you{" "}
                            <Link className="highlight" href="/donate">
                                donate
                            </Link>{" "}
                            $2+, you can receive additional username changes
                            which will be credited to your account once your
                            donation is processed.
                        </span>
                    </p>
                    <p className="py-6">
                        Your account can hold up to 12 username changes at a
                        time, and your username can only be changed once every
                        30 days.
                    </p>
                    <p>
                        Mnior changes such as capitalizations, 1-2 letter
                        changes, etc... can be changed for free by contacting
                        anyone listed on the{" "}
                        <Link className="highlight" href="/info/contact">
                            Contact Us
                        </Link>{" "}
                        page.
                    </p>
                </div>
                <form
                    className="flex-col-4"
                    action={async (data) => {
                        setCheck("unchecked");
                        action(data);
                    }}
                >
                    <div className="flex-row-2-center">
                        <Label>Current Username:</Label>
                        <span className="text-sm">{usernameInitial}</span>
                    </div>
                    <div className="flex-col-2">
                        <Label htmlFor="username">New Username</Label>
                        <div className="flex-row-2">
                            <input
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.currentTarget.value)
                                }
                                className="flex-grow"
                            />
                            <button
                                className="button-blue"
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
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span
                            className={clsx(
                                "inline-block",
                                check === "unavailable"
                                    ? "text-red-500"
                                    : "text-green-500"
                            )}
                        >
                            {check !== "unchecked" && <>{check_message}</>}
                        </span>
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </Section>
    );
}
