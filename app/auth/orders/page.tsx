import css from "./page.module.css"
import {Header} from "@/components/Header/Header";
import {Field} from "@/components/Field/Field";
import React from "react";
import {OrdersList} from "@/components/Api/OrdersList";
import {RequireAuth} from "@/components/Api/RequireAuth";

export default function Page() {

    return (
        <div className={css.mainContainer}>
            <RequireAuth type={"loggedIn"}/>
            <Field padding={"10px"}>
                <Header padding={"5px"}>Orders</Header>
                <OrdersList/>
            </Field>
        </div>
    );
}