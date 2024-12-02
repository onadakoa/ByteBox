import css from "./Button.module.css"
import {Roboto} from "next/font/google";
import {CSSProperties} from "react";
const roboto = Roboto({subsets: ["latin"], weight: ["400"]})

export default function Button(props: {
    children: React.ReactNode,
    backgroundColor?: string,
    color?: string,
    onClick?: () => void,
}) {

    const style: CSSProperties & {[key:string]:string} = {
        "--Color": (props.color || "white"),
        "--BColor": (props.backgroundColor || "var(--green-color)"),
    }

    return (<div style={style} className={[roboto.className,css.container].join(" ")} onClick={props.onClick}>
        {props.children}
    </div>)
}