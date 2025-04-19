import css from "./ManagerButton.module.css";
import {CSSProperties, ReactNode} from "react";

export function ManagerButton(props: {
    children?: ReactNode,
    width?: string,
    padding?: string,
    onClick?: () => void,
}) {
    const style: CSSProperties = {
        width: props.width,
        padding: props.padding,
    }
    return (
        <button onClick={props.onClick} className={css.container} style={style}>{props.children}</button>
    );
}