"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Markdown from "react-markdown";
import Icon from "./icon";
import { faEye, faPencil } from "./icons";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";

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
        <div className="flex flex-col">
            <div className="flex flex-row justify-between py-4">
                <div>{props.label}</div>
                {!props.readOnly && (
                    <>
                        <ToggleGroup
                            type="single"
                            value={mode}
                            onValueChange={(value) =>
                                setMode(value as EditorMode)
                            }
                        >
                            <ToggleGroupItem
                                value="edit"
                                className="p-2 rounded-l-lg border-white/10 border-2 boder-r-0  hover:bg-white/5 data-[state=on]:bg-white/15"
                            >
                                <Icon icon={faPencil.fas} />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="preview"
                                className="p-2 rounded-r-lg border-white/10 border-2 boder-r-0  hover:bg-white/5 data-[state=on]:bg-white/15"
                            >
                                <Icon icon={faEye.fas} />
                            </ToggleGroupItem>
                        </ToggleGroup>
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
                        className="markdown border border-white/5 p-4 rounded-md"
                        skipHtml
                        disallowedElements={["img"]} // should images be allowed?
                        unwrapDisallowed
                    >
                        {value}
                    </Markdown>
                ) : (
                    <span className="italic text-white/30">
                        No content to display
                    </span>
                ))}
        </div>
        // <Field className="flex flex-col">
        //     <div className="flex flex-row justify-between py-4">
        //         <div className="cursor-default">{props.label}</div>

        //         {!props.readOnly && (
        //             <RadioGroup
        //                 value={mode}
        //                 onChange={setMode}
        //                 className="cursor-pointer"
        //             >
        //                 <Radio
        //                     value="edit"
        //                     className="p-2 rounded-l-lg border-white/10 border-2 boder-r-0  hover:bg-white/5 data-[checked]:bg-white/15"
        //                     title="Edit"
        //                 >
        //                     <Icon icon={faPencil.fas} />
        //                 </Radio>
        //                 <Radio
        //                     value="preview"
        //                     className="p-2 rounded-r-lg border-white/10 border-2 border-l-0 hover:bg-white/5 data-[checked]:bg-white/15"
        //                     title="Preview"
        //                 >
        //                     <Icon icon={faEye.fas} />
        //                 </Radio>
        //             </RadioGroup>
        //         )}
        //     </div>
        //     <textarea
        //         name={props.name}
        //         value={value}
        //         hidden
        //         readOnly
        //         form={props.form}
        //     />
        //     {mode === "edit" && (
        //         <Editor
        //             className="h-40"
        //             defaultLanguage="markdown"
        //             value={value}
        //             onChange={(v) => setValue((v ?? "").trim())}
        //         />
        //     )}
        //     {mode === "preview" &&
        //         (value ? (
        //             <Markdown
        //                 className="markdown border border-white/5 p-4 rounded-md"
        //                 skipHtml
        //                 disallowedElements={["img"]} // should images be allowed?
        //                 unwrapDisallowed
        //             >
        //                 {value}
        //             </Markdown>
        //         ) : (
        //             <span className="italic text-white/30">
        //                 No content to display
        //             </span>
        //         ))}
        // </Field>
    );
}
