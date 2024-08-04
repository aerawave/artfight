"use client";

import { Section } from "@/app/components/section";
import Link from "next/link";
import React, { useState } from "react";
import { GeneralErrors } from "@/app/actions/errors/general";
import { ErrorList } from "@/app/user/settings/components/user-settings/error-list";
import Icon from "@/app/components/icon";
import { faXMark } from "@/app/components/icons";

export default function CharacterTags(props: {
    defaults?: { tags: string[] | undefined };
    errors?: GeneralErrors;
    form?: string;
}) {
    const [tags, setTags] = useState<string[]>(props.defaults?.tags ?? []);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [current_tag, setCurrentTag] = useState("");

    const cleanTag = (tag: string): string => {
        return tag
            .trim()
            .replace(/,/g, "")
            .replace(/_/g, "\\_")
            .replace(/\s/g, "_")
            .toLowerCase();
    };

    const prettyTag = (tag: string): string => {
        const temp = "%TEMP%";
        return tag
            .replace(/\\_/g, temp)
            .replace("_", " ")
            .replace(new RegExp(temp, "g"), "_");
    };

    const onChange = (tag: string): void => {
        const clean_tag = cleanTag(tag);
        setCurrentTag(tag);

        if (tag.length > 0) {
            setSuggestions([clean_tag, `#${clean_tag}`, `${clean_tag}?`]);
        } else {
            setSuggestions([]);
        }
    };

    const addCleanTag = (tag: string, keepInput?: boolean) => {
        setTags(tags.concat(tag));
        if (!keepInput) {
            setCurrentTag("");
            setSuggestions([]);
        }
    };

    const addTag = (tag: string, keepInput?: boolean) => {
        return addCleanTag(cleanTag(tag), keepInput);
    };

    const removeTag = (index: number): void => {
        const new_tags = tags.slice();
        new_tags.splice(index, 1);
        setTags(new_tags);
    };

    return (
        <Section title="Tags">
            <div className="rounded-md bg-cyan-600 p-3 text-lg markdown text-white">
                {/* remove "markdown" class later.. need a better way of unformatting things like the ul/li elements. */}
                <p>
                    Tags are used to find certain types of characters in the{" "}
                    <Link className="highlight" href="/browse/tag">
                        Tag Search
                    </Link>
                    .
                </p>
                <ul>
                    <li>Characters may have up to 10 tags each</li>
                    <li>Any commas will be removed from tags</li>
                    <li>Tags should be relevant to the character</li>
                    <li>
                        Tags may be removed at staff discretion if they are
                        found to go against the{" "}
                        <Link className="highlight" href="/info/guide-filters">
                            Filter Guidelines
                        </Link>
                        .
                    </li>
                </ul>
            </div>

            <hr className="my-4" />
            <ErrorList errors={props.errors?.general} />

            <div className="flex flex-row gap-2 my-4">
                {tags.map((tag, i) => (
                    <button
                        key={i}
                        className="rounded-full bg-cyan-400/50 text-white py-1 px-2 hover:bg-red-500/50"
                        onClick={() => removeTag(i)}
                    >
                        {prettyTag(tag)}
                        <Icon
                            icon={faXMark.fas}
                            className="ml-2 rounded-full"
                        />
                    </button>
                ))}
            </div>

            <div className="flex flex-row gap-2">
                <input
                    type="hidden"
                    name="tags"
                    value={tags.join(" ")}
                    readOnly
                    form={props.form}
                />
                <input
                    placeholder="Add a new tag..."
                    value={current_tag}
                    onChange={(e) => onChange(e.currentTarget.value)}
                    className="p-2 w-4/5"
                />
                <button
                    onClick={() => addTag(current_tag)}
                    className="rounded-lg bg-cyan-600 p-2 w-1/5"
                >
                    Add Tag
                </button>
            </div>

            {suggestions.length > 0 && (
                <div className="flex flex-row gap-2 mt-4">
                    <span>Suggested Tags: </span>
                    {suggestions.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => addCleanTag(tag)}
                            className="rounded-xl bg-lime-800 text-white p-1"
                        >
                            {prettyTag(tag)}
                        </button>
                    ))}
                </div>
            )}
        </Section>
    );
}
