"use client";

import { ImageFilter } from "@/app/actions/user";
import Icon from "@/app/components/icon";
import { faCheck, faEyeSlash, faXMark, IconType } from "@/app/components/icons";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import Link from "next/link";
import React, { useState } from "react";

export type ImageFilterLevel = "hide" | "censor" | "show";

type ChangeImageFilterProps = {
    id?: string;
    filter: ImageFilter;
    icon: IconType;
    label: string;
    guide: string;
    value?: ImageFilterLevel;
    onChange?: (level: ImageFilterLevel) => void;
};

export default function ChangeImageFilter({
    id,
    filter,
    icon,
    label,
    guide,
    value,
    onChange: SUPER_onChange,
}: ChangeImageFilterProps) {
    const [selected, setSelected] = useState<ImageFilterLevel>(
        value ?? "censor"
    );

    const onChange = (value: ImageFilterLevel) => {
        setSelected(value);
        if (SUPER_onChange) SUPER_onChange(value);
    };

    return (
        <div>
            <div className="flex flex-row justify-between">
                <h4>
                    <Icon icon={icon} className="mr-1" />
                    <span>{label}</span>
                </h4>
                <span>
                    <Link className="highlight" href={`/info/${guide}`}>
                        {guide} guide
                    </Link>
                </span>
            </div>
            <input hidden name={filter} value={selected} readOnly />
            <ToggleGroup
                id={id}
                type="single"
                value={selected}
                onValueChange={(value) => onChange(value as ImageFilterLevel)}
                className="button-group grid justify-items-stretch grid-cols-3 m-2"
            >
                <ToggleGroupItem
                    value="hide"
                    className="data-[state=on]:bg-red-600/75"
                >
                    <Icon icon={faXMark.fas} className="mr-2" />
                    <span>Hide</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="censor"
                    className="data-[state=on]:bg-orange-500/75"
                >
                    <Icon icon={faEyeSlash.fas} className="mr-2" />
                    <span>Censor</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="show"
                    className="data-[state=on]:bg-lime-800/75"
                >
                    <Icon icon={faCheck.fas} className="mr-2" />
                    <span>Show</span>
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
}
