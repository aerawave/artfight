"use server";

import Image from "next/image";
import { getUserByUsername } from "@/app/actions/user";
import db from "@/data/db/database";
import { Characters, Files, Images } from "@/data/db/schema";
import { and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { Section } from "@/app/components/section";
import Markdown from "react-markdown";
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
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div className="flex-grow">
                    <div className="flex flex-col items-center">
                        <div className="h-[600px]">
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
                        <div className="grid grid-cols-2 gap-4 max-h-[32.5rem] overflow-y-auto">
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="ph"
                                className="w-60 h-60"
                            />
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="ph"
                                className="w-60 h-60"
                            />
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="ph"
                                className="w-60 h-60"
                            />
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="ph"
                                className="w-60 h-60"
                            />
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="ph"
                                className="w-60 h-60"
                            />
                            <Image
                                src={main_image_url}
                                width="6000"
                                height="6000"
                                alt="ph"
                                className="w-60 h-60"
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
                    className="flex-grow border border-red-500"
                    titleClass="bg-red-500"
                    noContentPadding
                >
                    <div className="flex flex-col">
                        <h5 className="p-2 bg-white/20 text-white">
                            Character Permissions
                        </h5>
                        <p className="p-2">
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
                        </p>
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
                <div className="w-1/5 flex flex-col gap-4">
                    <Section title="Character Info" noContentPadding>
                        <div className="flex flex-col">
                            <div className="flex flex-row border-y border-black">
                                <div className="w-2/5 align-middle p-2 bg-white/20 text-right">
                                    Owner:
                                </div>
                                <div className="flex-grow p-2">
                                    <Link
                                        href={`/users/${user.username}`}
                                        className="highlight"
                                    >
                                        {user.username}
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-row border-y border-black">
                                <div className="w-2/5 align-middle p-2 bg-white/20 text-right">
                                    Designer:
                                </div>
                                <div className="flex-grow p-2">
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
                    <Section
                        title="Tags"
                        className="border border-cyan-600"
                        titleClass="bg-cyan-600 text-white/80"
                    >
                        <div className="flex flex-row flex-wrap gap-2">
                            {"lorem ipsum dolor sit amet consectetur adipisicing"
                                .split(" ")
                                .map((tag) => (
                                    <Chip
                                        key={tag}
                                        className="bg-cyan-500/75 text-white font-bold py-1 px-3"
                                    >
                                        {tag}
                                    </Chip>
                                ))}
                        </div>
                    </Section>
                </div>
            </div>
            <div className="text-4xl">Comments...</div>
        </div>
    );
}
