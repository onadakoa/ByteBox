"use client";
import css from "./UserSettings.module.css";
import {Table} from "@/components/Table/Table";
import {TableField} from "@/components/Table/TableField";
import {Input} from "@/components/Form/Input";
import SubmitButton from "@/components/Button/SubmitButton";

export const UserSettings = () => {
    return (
        <form className={css.container}>
            <Table>
                <TableField value={"Login"}><Input name={"email"} placeholder={"John@example.com"}/></TableField>
                <TableField value={"Imie"}><Input name={"firstname"} placeholder={"John"}/></TableField>
                <TableField value={"Nazwisko"}><Input name={"lastname"} placeholder={"Smith"}/></TableField>
            </Table>
            <div className={css.action}>
                <SubmitButton>Save</SubmitButton>
            </div>
        </form>
    );
};