"use client";

import React from "react";

type BannerTeamData = {
    team: string;
    banners: number;
};

type BannerProps = {
    banners?: BannerTeamData[];
};

const SeafoamStardust: BannerTeamData[] = [
    {
        team: "seafoam",
        banners: 3,
    },
    {
        team: "stardust",
        banners: 3,
    },
];

export default function Banner(props: BannerProps) {
    const banners = (props.banners ?? SeafoamStardust).flatMap((v) =>
        new Array(v.banners).fill(0).map((_, i) => `${v.team}_${i + 1}.png`)
    );

    banners.splice(0, banners.length, "default.jpg");

    const banner_src = `/assets/img/banners/${
        banners[Math.floor(Math.random() * banners.length)]
    }`;

    return (
        <div
            className="banner"
            style={{ backgroundImage: `url(${banner_src})` }}
        />
    );
}
