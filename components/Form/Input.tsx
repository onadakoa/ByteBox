"use client"
import css from "./Input.module.css"
import {ChangeEventHandler, HTMLInputTypeAttribute, useState} from "react";

export function Input(props: {
    type?: HTMLInputTypeAttribute,
    placeholder?: string,
    value?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    name?: string
}) {
    const [value, setValue] = useState(props.value || "");

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (props.onChange != undefined)
            props.onChange(event);
        else setValue(event.target.value);
    }

    return (
        <div className={css.container}>
            <input name={props.name || undefined}
                   onChange={onChange}
                   value={props.value || value}
                   type={props.type || "text"}
                   placeholder={props.placeholder || undefined}
            />
        </div>
    );
}