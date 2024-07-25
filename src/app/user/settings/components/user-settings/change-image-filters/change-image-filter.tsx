"use client";

import { ImageFilter } from "@/app/actions/user";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
    faTimes,
    faEyeSlash,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Radio, RadioGroup } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";

export type ImageFilterLevel = "hide" | "censor" | "show";

type ChangeImageFilterProps = {
    filter: ImageFilter;
    icon: IconProp;
    label: string;
    guide: string;
    value?: ImageFilterLevel;
    onChange?: (level: ImageFilterLevel) => void;
};

export default function ChangeImageFilter({
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
                    <FontAwesomeIcon icon={icon} className="mr-1" />
                    <span>{label}</span>
                </h4>
                <span>
                    <Link className="highlight" href={`/info/${guide}`}>
                        {guide} guide
                    </Link>
                </span>
            </div>
            <RadioGroup
                name={filter}
                value={selected}
                onChange={onChange}
                className="button-group grid justify-items-stretch grid-cols-3 m-2"
            >
                <Radio value="hide" className="data-[checked]:bg-red-600/75">
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    <span>Hide</span>
                </Radio>
                <Radio
                    value="censor"
                    className="data-[checked]:bg-orange-500/75"
                >
                    <FontAwesomeIcon icon={faEyeSlash} className="mr-2" />
                    <span>Censor</span>
                </Radio>
                <Radio value="show" className="data-[checked]:bg-lime-800/75">
                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                    <span>Show</span>
                </Radio>
            </RadioGroup>
        </div>
    );
}
