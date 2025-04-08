import css from "./List.module.css";
import {poppins} from "@/utils/font";
import React, {CSSProperties} from "react";
import {ListContextProvider} from "@/utils/ListContext";

export const List = (props: { children?: React.ReactNode, className?: string, gridTemplateColumns?: string, border?: string }) => {
    const style: CSSProperties = {
        border: props.border
    }
    return (
        <div className={[poppins.className, css.container, props.className].join(" ")} style={style}>
            <ListContextProvider gridTemplateColumns={props.gridTemplateColumns}>
                {props.children}
            </ListContextProvider>
        </div>
    );
};


