"use client";

import React, { useState } from "react";
import { Field, Radio, RadioGroup } from "@headlessui/react";
import Editor from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRuler } from "@fortawesome/free-solid-svg-icons";
import Markdown from "react-markdown";

type EditorMode = "preview" | "edit";

type TextBoxProps = {
    label: React.ReactNode;
    name: string;
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    defaultMode?: EditorMode;
    readOnly?: boolean;
};

export default function MarkdownBox(props: TextBoxProps) {
    let default_mode = props.defaultMode ?? "edit";

    if (props.readOnly) {
        default_mode = "preview";
    }

    const [mode, setMode] = useState<EditorMode>(default_mode);
    const [value, setValue] = useState(props.value);

    return (
        <Field className="flex flex-col">
            <div className="flex flex-row justify-between py-4">
                <div className="cursor-default">{props.label}</div>

                {!props.readOnly && (
                    <RadioGroup
                        value={mode}
                        onChange={setMode}
                        className="cursor-pointer"
                    >
                        <Radio
                            value="edit"
                            className="p-2 rounded-l-lg border-white/10 border-2 boder-r-0  hover:bg-white/5 data-[checked]:bg-white/15"
                        >
                            <FontAwesomeIcon icon={faPencil} />
                        </Radio>
                        <Radio
                            value="preview"
                            className="p-2 rounded-r-lg border-white/10 border-2 border-l-0 hover:bg-white/5 data-[checked]:bg-white/15"
                        >
                            <FontAwesomeIcon icon={faRuler} />
                        </Radio>
                    </RadioGroup>
                )}
            </div>
            <input name={props.name} value={value} hidden readOnly />
            {mode === "edit" && (
                <Editor
                    className="h-40"
                    defaultLanguage="markdown"
                    value={value}
                    onChange={(v) => setValue((v ?? "").trim())}
                />
            )}
            {mode === "preview" &&
                (value ? (
                    <Markdown
                        className="markdown"
                        skipHtml
                        disallowedElements={["img"]} // should images be allowed?
                        unwrapDisallowed
                    >
                        {value}
                    </Markdown>
                ) : (
                    <span className="italic text-white/30">
                        No description provided
                    </span>
                ))}
        </Field>
    );
}
