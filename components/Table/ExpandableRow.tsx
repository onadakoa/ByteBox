"use client";
import css from "./ExpandableRow.module.css";
import React, {CSSProperties} from "react";
import ListRow, {RowProps} from "./ListRow";

export function ExpandableRow(props: RowProps & {
    content?: React.ReactNode,
    backgroundColor?: string,
    indentation?: string,
}) {
    const [expanded, setExpanded] = React.useState(false);

    const style: CSSProperties = {
        padding: props.padding
    }
    const contentStyle: CSSProperties = {
        paddingLeft: props.indentation ? props.indentation : undefined,
    }
    const expand = () => {
        setExpanded(!expanded);
    }
    const contentClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    }

    return (
        <div className={[props.className, css.container, (expanded) ? css.expanded : undefined].join(" ")} style={style} onClick={expand}>
            <ListRow>
                {props.children}
            </ListRow>
            <div className={css.content} style={contentStyle}>
                <div onClick={contentClick} style={{backgroundColor: props.backgroundColor}}>
                    {props.content}
                </div>
            </div>
        </div>
    );
}