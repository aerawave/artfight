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
import { Card } from "@/app/components/card";
import Markdown from "react-markdown";

import "./profile-tab.css";
import Chip from "@/app/components/chip";

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
            <section className="image-viewer">
                <div>
                    <div className="image-box">
                        <div>
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="main image"
                            />
                        </div>
                        <span>
                            Image by{" "}
                            <Link
                                href={
                                    result.mainImage.isArtist
                                        ? `/users/${user.username}`
                                        : result.mainImage.artistUrl ?? ""
                                }
                                className="highlight"
                            >
                                {result.mainImage.isArtist
                                    ? user.username
                                    : result.mainImage.artistName}
                            </Link>{" "}
                            (
                            <Link href={main_image_url} className="highlight">
                                Full view
                            </Link>
                            )
                        </span>
                    </div>
                </div>
                <aside>
                    <Card title="Images">
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
                    </Card>
                </aside>
            </section>
            <section className="character-details">
                <h1>
                    <span>{result.character.name}</span>
                    <span>
                        {" by "}
                        <Link
                            href={`/users/${user.username}`}
                            className="highlight"
                        >
                            {user.username}
                        </Link>
                    </span>
                </h1>
                <Markdown
                    className="deformat markdown"
                    skipHtml
                    disallowedElements={["img"]} // should images be allowed?
                    unwrapDisallowed
                >
                    {result.character.description}
                </Markdown>
                <Card
                    title="Permissions"
                    variant="danger"
                    className="character-permissions"
                    noContentPadding
                >
                    <div className="field-v">
                        <h5 className="sub-label">Character Permissions</h5>
                        <div>
                            {result.character.permissions ? (
                                <Markdown
                                    className="deformat markdown"
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
                    </div>
                    <div className="field-v">
                        <h5>
                            <Link
                                href={`/users/${user.username}`}
                                className="highlight"
                            >
                                {user.username}
                            </Link>
                            {"'s Global Permisisons"}
                        </h5>
                        <p>No permissions specified.</p>
                    </div>
                </Card>
                <div className="character-information">
                    <Card
                        title="Character Info"
                        variant="success dark"
                        noContentPadding
                    >
                        <div className="character-info">
                            <div className="field-h">
                                <h5>Owner:</h5>
                                <div>
                                    <Link
                                        href={`/users/${user.username}`}
                                        className="highlight"
                                    >
                                        {user.username}
                                    </Link>
                                </div>
                            </div>
                            <div className="field-h">
                                <h5>Designer:</h5>
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
                    </Card>
                    <Card title="Tags" variant="info">
                        <div className="tags-list">
                            {(result.character.tags ?? "")
                                .split(" ")
                                .map((tag) => (
                                    <Chip key={tag} variant="info">
                                        {tag}
                                    </Chip>
                                ))}
                        </div>
                    </Card>
                </div>
            </section>
            <section className="comments">Comments...</section>
        </div>
    );
}
