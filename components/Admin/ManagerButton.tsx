import css from "./ManagerButton.module.css";
import {CSSProperties, ReactNode} from "react";
import Link from "next/link";

export function ManagerButton(props: {
    children?: ReactNode,
    width?: string,
    padding?: string,
    onClick?: () => void,
    href?: string,
    disabled?: boolean,
}) {
    const style: CSSProperties = {
        width: props.width,
        padding: props.padding,
    }

    if (props.href) {
        return (
            <Link href={props.href}>
                <button className={css.container} style={style} disabled={props.disabled}>{props.children}</button>
            </Link>
        );
    }

    return (
        <button onClick={props.onClick} className={css.container} style={style} disabled={props.disabled}>{props.children}</button>
    );
}
