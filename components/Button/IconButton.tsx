import React, {CSSProperties, JSXElementConstructor} from "react";
import css from "./IconButton.module.css"

interface IIconButton {
    children: React.ReactNode;
    icon: React.ReactNode;
    icon_position?: "left" | "right";
    onClick?: () => void;
}

const IconButton: React.FunctionComponent<IIconButton> = (props) => {

    const style: CSSProperties = {
        flexDirection: "row"
    }
    if (props.icon_position === "left") {
        style.flexDirection = "row-reverse";
    }

    return (<div style={style} className={css.container} onClick={props.onClick}>
        <span>{props.children}</span>
        {props.icon}
    </div>)
}

export default IconButton;