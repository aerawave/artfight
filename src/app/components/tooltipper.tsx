"use client";

import React, { useState } from "react";

type TooltipperProps = {
    target: React.ReactNode;
    content: React.ReactNode;
    buttonClassName?: string;
    className?: string;
    popoverClassName?: string;
};

export default function Tooltipper(props: TooltipperProps) {
    const [hover, setHover] = useState(false);

    return (
        <></>
        // <Popover className={props.className}>
        //     <>
        //         <PopoverButton
        //             className={`cursor-default ${props.buttonClassName}`}
        //             onMouseEnter={() => setHover(true)}
        //             onMouseLeave={() => setHover(false)}
        //         >
        //             {props.target}
        //         </PopoverButton>
        //         <PopoverPanel
        //             static={hover}
        //             anchor="top"
        //             className={`w-40 text-center text-xs ${props.popoverClassName}`}
        //         >
        //             {props.content}
        //         </PopoverPanel>
        //     </>
        // </Popover>
    );
}
