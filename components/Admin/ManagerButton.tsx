import css from "./ManagerButton.module.css";
import {CSSProperties, ReactNode} from "react";
import Link from "next/link";

export function ManagerButton(props: {
    children?: ReactNode,
    width?: string,
    padding?: string,
    onClick?: () => void,
    href?: string,
}) {
    const style: CSSProperties = {
        width: props.width,
        padding: props.padding,
    }

    if (props.href) {
        return (
            <Link href={props.href}>
                <button className={css.container} style={style}>{props.children}</button>
            </Link>
        );
    }

    return (
        <button onClick={props.onClick} className={css.container} style={style}>{props.children}</button>
    );
}
