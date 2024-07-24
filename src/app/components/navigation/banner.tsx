import Image from "next/image";

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

export default async function Banner(props: BannerProps) {
    const banners = (props.banners ?? SeafoamStardust).flatMap((v) =>
        new Array(v.banners).fill(0).map((_, i) => `${v.team}_${i + 1}`)
    );

    const banner_src = `/assets/img/banners/${
        banners[Math.floor(Math.random() * banners.length)]
    }.png`;

    return (
        <Image
            alt="banner"
            src={banner_src}
            width="6000"
            height="696"
            quality={1}
            className="w-max"
        />
    );
}
