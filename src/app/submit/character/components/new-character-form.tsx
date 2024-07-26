"use client";

import MarkdownBox from "@/app/components/markdown-box";
import { Section } from "@/app/components/section";
import { Button, Field, Input, Label } from "@headlessui/react";
import React from "react";

export default function NewCharacterForm() {
    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            action={(data) =>
                console.log(
                    JSON.stringify({
                        name: data.get("name"),
                        description: data.get("description"),
                    })
                )
            }
        >
            <Section title="Basic Information" className="flex flex-col gap-4">
                <Field className="flex flex-col gap-2">
                    <Label className="font-bold text-sm text-white/75">
                        <span>Name</span>
                        <span className="text-red-500">*</span>
                    </Label>
                    <Input name="name" required />
                </Field>
                <Field className="flex flex-col gap-2">
                    <MarkdownBox
                        label={
                            <span className="font-bold text-sm text-white/75">
                                Description
                            </span>
                        }
                        name="description"
                    />
                </Field>
                <div className="m-2 flex flex-row-reverse">
                    <Button
                        className="rounded-lg bg-cyan-600 p-2 text-white"
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </Section>
        </form>
    );
}
