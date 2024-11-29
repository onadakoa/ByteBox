import css from "./FeedController.module.css"
import {ReactElement} from "react";

export default function FeedController(
    props: {
        children: ReactElement | ReactElement[] | undefined,
    }
) {

    return (<div className={css.container}>
        {props.children}
    </div>)
}