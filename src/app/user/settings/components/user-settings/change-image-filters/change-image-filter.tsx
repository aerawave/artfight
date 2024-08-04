"use client";

import { ImageFilter } from "@/app/actions/user";
import Icon from "@/app/components/icon";
import { faCheck, faEyeSlash, faXMark, IconType } from "@/app/components/icons";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
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
        <div className="flex-col-2">
            <div className="yes-no">
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

            <RadioGroup
                id={id}
                className="button-group justify-center"
                value={selected}
                onValueChange={(value) => onChange(value as ImageFilterLevel)}
            >
                <RadioGroupItem value="hide" className="button-filters-hide">
                    <Icon icon={faXMark.fas} />
                    <span>Hide</span>
                </RadioGroupItem>
                <RadioGroupItem
                    value="censor"
                    className="button-filters-censor"
                >
                    <Icon icon={faEyeSlash.fas} />
                    <span>Censor</span>
                </RadioGroupItem>
                <RadioGroupItem value="show" className="button-filters-show">
                    <Icon icon={faCheck.fas} />
                    <span>Show</span>
                </RadioGroupItem>
            </RadioGroup>
        </div>
    );
}
