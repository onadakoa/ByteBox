import css from "./ListCell.module.css"
import React, {CSSProperties} from "react";

export const ListCell = (props: { children?: React.ReactNode, className?: string, padding?: string, centerHorizontal?: boolean }) => {
    const style: CSSProperties = {
        padding: props.padding,
        justifyContent: (props.centerHorizontal) ? "center" : undefined,
    }
    return (
        <div className={[css.container, props.className].join(" ")} style={style}>
            {props.children}
        </div>
    );
};