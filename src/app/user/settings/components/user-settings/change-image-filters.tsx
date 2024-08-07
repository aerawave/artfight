"use client";

import React from "react";
import { Card } from "@/app/components/card";
import ChangeImageFilter from "./change-image-filters/change-image-filter";
import Link from "next/link";
import { useFormState } from "react-dom";
import { changeFilters } from "@/app/actions";
import { ErrorList } from "./error-list";
import {
    faAsterisk,
    faDroplet,
    faEye,
    faHeart,
    faLeaf,
    faTeeth,
} from "@/app/components/icons";
import SubmitButton from "@/app/components/submit-button";
import Alert from "@/app/components/alert";

type ChangeImageFiltersProps = {
    className?: string;
};

export default function ChangeImageFilters({
    className,
}: ChangeImageFiltersProps) {
    const [state, action] = useFormState(changeFilters, {});
    return (
        <Card className={className} title={<h4>Site Image Filters</h4>}>
            <div className="flex-col-2">
                <div>
                    {state.success ? (
                        <h5 className="text-green-400">Filters updated!</h5>
                    ) : (
                        <ErrorList errors={state.errors?.general} />
                    )}
                </div>
                <Alert variant="info">
                    <p>
                        Note that it is the submitting artist&apos;s
                        responsibility to put the appropiate filters on their
                        submissions!
                    </p>
                    <br />
                    <p>
                        Please report content that hasn&apos;t been marked
                        appropiately.
                    </p>
                </Alert>
                <p className="mb-4">
                    Choose what content you want to see. More information on
                    these categories can be found in the{" "}
                    <Link className="highlight" href="/info/guide-filters">
                        Filter Guidelines
                    </Link>
                    .
                </p>
                <p className="text-sm mb-4">
                    <span>
                        <strong className="text-hide">Hide</strong>: Filtered
                        characters/attacks/images will be completely hidden.
                        Filteered characters/attacks will not show up while
                        browsing and will not be shown while voting.
                    </span>
                    <br />
                    <span>
                        <strong className="text-censor">Censor</strong>:
                        Filtered content will show a generic cover thumbnail
                        (you can click on the character/attack/image at your own
                        risk).
                    </span>
                    <br />
                    <span>
                        <strong className="text-show">Show</strong>: Filtered
                        characters/attacks/images will be visible.
                    </span>
                </p>
                <form action={action} className="flex-col-2">
                    <ChangeImageFilter
                        icon={faDroplet.fas}
                        label="Gore (moderate)"
                        filter="filter_moderate_gore"
                        guide="gore"
                    />
                    <ChangeImageFilter
                        icon={faDroplet.fas}
                        label="Gore (extreme)"
                        filter="filter_extreme_gore"
                        guide="gore"
                    />
                    <ChangeImageFilter
                        icon={faTeeth.fas}
                        label="Body Horror"
                        filter="filter_body_horror"
                        guide="body_horror"
                    />
                    <ChangeImageFilter
                        icon={faLeaf.fas}
                        label="Nudity (moderate)"
                        filter="filter_moderate_nudity"
                        guide="nudity"
                    />
                    <ChangeImageFilter
                        icon={faLeaf.fas}
                        label="Nudity (extreme)"
                        filter="filter_extreme_nudity"
                        guide="nudity"
                    />
                    <ChangeImageFilter
                        icon={faHeart.far}
                        label="Suggestive Themes"
                        filter="filter_suggestive_themes"
                        guide="sexual_themes"
                    />
                    <ChangeImageFilter
                        icon={faEye.far}
                        label="Eyestrain"
                        filter="filter_eyestrain"
                        guide="eyestrain"
                    />
                    <ChangeImageFilter
                        icon={faAsterisk.fas}
                        label="Sensitive Content"
                        filter="filter_sensitive_content"
                        guide="other_filters"
                    />
                    <div className="self-end">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </Card>
    );
}
