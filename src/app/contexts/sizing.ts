"use client";

import { useEffect, useState } from "react";

function getScreenSize() {
    const width = window.innerWidth;
    if (width >= 1280) {
        return 4;
    } else if (width >= 1024) {
        return 3;
    } else if (width >= 768) {
        return 2;
    } else if (width >= 640) {
        return 1;
    } else {
        return 0;
    }
}

export function useScreenSize() {
    const [screen_size, setScreenSize] = useState(-1);

    useEffect(() => {
        setScreenSize(getScreenSize());
        const handleResize = () => {
            setScreenSize(getScreenSize());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return screen_size;
}
