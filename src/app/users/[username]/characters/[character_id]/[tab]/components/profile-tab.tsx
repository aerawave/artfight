"use server";

import React from "react";
import Image from "next/image";
import { getUserByUsername } from "@/app/actions/user";
import db from "@/data/db/database";
import { Characters, Files, Images } from "@/data/db/schema";
import { and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/app/components/section";
import Markdown from "react-markdown";

import "./profile-tab.css";

async function getCharacter(username: string, character_id: number) {
    const user = await getUserByUsername(username);

    if (!user) {
        return undefined;
    }

    const aliases = {
        character: alias(Characters, "character"),
        mainImage: alias(Images, "mainImage"),
        mainImageFile: alias(Files, "mainImageFile"),
    };

    const character = (
        await db
            .select()
            .from(aliases.character)
            .where((record) =>
                and(eq(record.id, character_id), eq(record.ownerId, user.id))
            )
            .leftJoin(
                aliases.mainImage,
                eq(aliases.mainImage.id, aliases.character.imageId)
            )
            .leftJoin(
                aliases.mainImageFile,
                eq(aliases.mainImageFile.id, aliases.mainImage.imageFileId)
            )
            .limit(1)
    )[0];

    return { user, character };
}

export default async function CharacterProfileTab(props: {
    username: string;
    characterId: number;
}) {
    const user_and_character = await getCharacter(
        props.username,
        props.characterId
    );

    if (!user_and_character) {
        notFound();
    }
    const { user, character: result } = user_and_character;

    if (!result.mainImage || !result.mainImageFile) {
        notFound();
    }

    const main_image_url = `/assets/${result.mainImageFile.name}`;

    return (
        <div className="flex-col-4">
            <div className="flex-row-2">
                <div className="flex-grow">
                    <div className="main-image-box">
                        <div>
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="main image"
                                className="h-full w-fit"
                            />
                        </div>
                        <span>
                            Image by{" "}
                            <Link
                                href={`/users/${props.username}`}
                                className="highlight"
                            >
                                {props.username}
                            </Link>{" "}
                            (
                            <Link href={main_image_url} className="highlight">
                                Full view
                            </Link>
                            )
                        </span>
                    </div>
                </div>
                <div className="w-1/3">
                    <Section title="Images">
                        <div className="more-images">
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="ph"
                            />
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="ph"
                            />
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="ph"
                            />
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="ph"
                            />
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="ph"
                            />
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="ph"
                            />
                        </div>
                    </Section>
                </div>
            </div>
            <div>
                <Markdown
                    className="markdown"
                    skipHtml
                    disallowedElements={["img"]} // should images be allowed?
                    unwrapDisallowed
                >
                    {result.character.description}
                </Markdown>
            </div>
            <div className="flex flex-row">
                <Section
                    title="Permissions"
                    className="flex-grow section-red"
                    noContentPadding
                >
                    <div className="flex flex-col">
                        <h5 className="p-2 bg-white/20 text-white">
                            Character Permissions
                        </h5>
                        <div className="p-2">
                            {result.character.permissions ? (
                                <Markdown
                                    className="markdown"
                                    skipHtml
                                    disallowedElements={["img"]} // should images be allowed?
                                    unwrapDisallowed
                                >
                                    {result.character.permissions}
                                </Markdown>
                            ) : (
                                "No permissions specified."
                            )}
                        </div>
                        <>
                            <h5 className="p-2 bg-white/20 text-white">
                                <Link
                                    href={`/users/${user.username}`}
                                    className="highlight"
                                >
                                    {user.username}
                                </Link>
                                {"'s Global Permisisons"}
                            </h5>
                            <p className="p-2">No permissions specified.</p>
                        </>
                    </div>
                </Section>
                <div className="w-1/5 flex-col-4">
                    <Section
                        title="Character Info"
                        className="section-olive"
                        noContentPadding
                    >
                        <div className="character-info">
                            <div className="row">
                                <div>Owner:</div>
                                <div>
                                    <Link
                                        href={`/users/${user.username}`}
                                        className="highlight"
                                    >
                                        {user.username}
                                    </Link>
                                </div>
                            </div>
                            <div className="row">
                                <div>Designer:</div>
                                <div>
                                    <Link
                                        href={`/users/${user.username}`}
                                        className="highlight"
                                    >
                                        {user.username}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Section>
                    <Section title="Tags" className="section-cyan">
                        <div className="tags-list">
                            {(result.character.tags ?? "")
                                .split(" ")
                                .map((tag) => (
                                    <div key={tag} className="chip-cyan-half">
                                        {tag}
                                    </div>
                                ))}
                        </div>
                    </Section>
                </div>
            </div>
            <div className="text-4xl">Comments...</div>
        </div>
    );
}
