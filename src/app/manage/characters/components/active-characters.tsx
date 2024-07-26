"use server";

import React from "react";

export default async function ActiveCharacters() {
    return (
        <div>
            <div className="p-4 bg-cyan-400/40 rounded-md mb-4">
                <p>
                    This is your active character roster - these are the
                    characters that will show on your profile and other users
                    will be able to attack them during an event. You are limited
                    to <strong>100 active characters</strong> at any given time.
                </p>
                <p>
                    Characters may also be hidden, which will hide them from
                    your profile and other users, but retain all of their
                    profile information. Hidden characters still count towad
                    your active character total.
                </p>
                <p className="pt-2">
                    To reduce your active character total, you can archive ro
                    permanently delete characters.
                </p>
                <p>
                    Note that archived characters retain some information on
                    site and may later be restored to your active roster, while
                    deleted characters will retain no information and will need
                    to be re-uploaded as a new character if you wish to use them
                    again.
                </p>
            </div>
            <h1 className="text-4xl">
                <strong>Active character total</strong>: 0 / 100
            </h1>
        </div>
    );
}
