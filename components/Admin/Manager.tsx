import css from "./Manager.module.css";
import {MiniSearchBar} from "@/components/Admin/MiniSearchBar";
import {List} from "@/components/Table/List";
import React, {ChangeEventHandler, ReactNode} from "react";

/*
    use `<ListRow>` in children component
 */
export const Manager = (props: {
    searchValue?: string,
    setSearchValue?: ChangeEventHandler<HTMLInputElement>,
    children?: ReactNode,
    additionalSettings?: ReactNode,
    additionalButtons?: ReactNode,
    gridTemplateColumns?: string,
    dontShowAction?: boolean,
}) => {
    return (
        <div className={css.container}>
            {(!props.dontShowAction) ? (
                <div className={css.action}>
                    <div><MiniSearchBar value={props.searchValue} setValue={props.setSearchValue}/></div>
                    <div>{props.additionalSettings}</div>
                    <div>{props.additionalButtons}</div>
                </div>
            ) : undefined}

            <div className={css.table}>
                <List gridTemplateColumns={props.gridTemplateColumns}>
                    {props.children}
                </List>
            </div>
        </div>
    );
};