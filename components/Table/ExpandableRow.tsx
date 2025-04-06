"use client";
import css from "./ExpandableRow.module.css";
import React, {CSSProperties, MouseEventHandler} from "react";
import ListRow, {RowProps} from "./ListRow";

export function ExpandableRow(props: RowProps & {
    expandedContent?: React.ReactNode,
    content?: React.ReactNode,
}) {
    const [expanded, setExpanded] = React.useState(true);

    const style: CSSProperties = {
        padding: props.padding
    }
    const expand = () => {
        setExpanded(!expanded);
    }
    const contentClick = (event: React.MouseEvent) =>{
        event.stopPropagation();
    }

    return (
        <div className={[props.className, css.container, (expanded) ? css.expanded : undefined].join(" ")} style={style} onClick={expand}>
            <ListRow>
                {props.children}
            </ListRow>
            <div className={css.content}>
                <div onClick={contentClick}>
                    {props.content}
                </div>
            </div>
        </div>
    );
}