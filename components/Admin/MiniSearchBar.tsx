"use client";
import css from "./MiniSearchBar.module.css";
import {poppins} from "@/utils/font";
import React, {ChangeEventHandler} from "react";

export const MiniSearchBar = (props: {
    value?: string,
    setValue?: ChangeEventHandler<HTMLInputElement>,
}) => {
    return (
        <input className={[poppins.className, css.input].join(" ")} value={props.value} onChange={props.setValue} type="text"
               placeholder={"Search..."}/>
    );
};