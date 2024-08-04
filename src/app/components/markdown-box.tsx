"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Markdown from "react-markdown";
import Icon from "./icon";
import { faEye, faPencil } from "./icons";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";

type EditorMode = "preview" | "edit";

type TextBoxProps = {
    label: React.ReactNode;
    name: string;
    disabled?: boolean;
    defaultValue?: string;
    onChange?: (value: string) => void;
    defaultMode?: EditorMode;
    readOnly?: boolean;
    form?: string;
};

export default function MarkdownBox(props: TextBoxProps) {
    let default_mode = props.defaultMode ?? "edit";

    if (props.readOnly) {
        default_mode = "preview";
    }

    const [mode, setMode] = useState<EditorMode>(default_mode);
    const [value, setValue] = useState(props.defaultValue);

    return (
        <div className="flex-col-2">
            <div className="yes-no">
                <div>{props.label}</div>
                {!props.readOnly && (
                    <>
                        <RadioGroup
                            className="button-group"
                            value={mode}
                            onValueChange={(value) =>
                                setMode(value as EditorMode)
                            }
                        >
                            <RadioGroupItem value="edit">
                                <Icon icon={faPencil.fas} />
                            </RadioGroupItem>
                            <RadioGroupItem value="preview">
                                <Icon icon={faEye.fas} />
                            </RadioGroupItem>
                        </RadioGroup>
                    </>
                )}
            </div>
            <textarea
                name={props.name}
                value={value}
                hidden
                readOnly
                form={props.form}
            />
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
                        className="deformat markdown-container"
                        skipHtml
                        disallowedElements={["img"]} // should images be allowed?
                        unwrapDisallowed
                    >
                        {value}
                    </Markdown>
                ) : (
                    <span className="disclaimer">No content to display</span>
                ))}
        </div>
    );
}
