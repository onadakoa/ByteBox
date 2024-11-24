import css from "./FeedButton.module.css"
import {Roboto} from "next/font/google";

const roboto = Roboto({subsets: ["latin"], weight: "400"})

const c = {
    active: css.active,
    unavailable: css.unavailable
}

export default function FeedButton(props: {
    children: string,
    type: "active" | "unavailable",
}) {

    return (<div className={[roboto.className, css.container, c[props.type]].join(" ")}>
        {props.children}
    </div>)
}