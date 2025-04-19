import css from "./IconLabel.module.css";
import React, {CSSProperties} from "react";

export const IconLabel = (props: {
    children?: React.ReactNode,
    IconComponent?: React.ReactNode,
    Gap?: string,
    ForceColumn?: boolean,
    padding?: string,
}) => {
    const style: CSSProperties = {
        gap: props.Gap,
        flexDirection: (props.ForceColumn) ? "column" : undefined,
        padding: props.padding,
    }
    return (
        <div className={css.container} style={style}>
            <span>
            {props.IconComponent}
            </span>
            <span>
            {props.children}
            </span>
        </div>
    );
};