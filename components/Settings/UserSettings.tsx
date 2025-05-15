"use client";
import css from "./UserSettings.module.css";
import {Table} from "@/components/Table/Table";
import {TableField} from "@/components/Table/TableField";
import {Input} from "@/components/Form/Input";
import SubmitButton from "@/components/Button/SubmitButton";
import useUser from "@/hooks/useUser";
import {FormEventHandler, useEffect, useState} from "react";
import {JsonError} from "@/utils/api";
import {mutate} from "swr";

export const UserSettings = () => {
    const {isLoading, isLoggedIn, user, error} = useUser();
    const [login, setLogin] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (!user) return;
        setLogin(user.login);
        setFirstname(user.first_name)
        setLastname(user.last_name);
    }, [isLoading]);

    const submit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setIsFetching(true);
        const body = Object.fromEntries(new FormData(event.currentTarget).entries());

        const res = await fetch("/api/user/index.php", {
            credentials: "include",
            body: JSON.stringify(body),
            method: "PUT"
        });

        if (!res.ok) {
            console.error("UserSettings: ", `failed to fetch, C: ${res.status}`)
            if (res.status != 404) {
                const json = await res.json() as JsonError;
                console.error("UserSettings: ", json)
            }
            return;
        }
        const json = await res.json();
        console.log(json);
        await mutate("/user/index.php");
        setIsFetching(false);
    }

    return (
        <form className={css.container} onSubmit={submit}>
            <Table>
                <TableField value={"Login"}>
                    <Input name={"login"} placeholder={"John@example.com"} value={login}
                           onChange={(e) => setLogin(e.target.value)}/>
                </TableField>
                <TableField value={"First name"}>
                    <Input name={"first_name"} placeholder={"John"} value={firstname}
                           onChange={(e) => setFirstname(e.target.value)}/>
                </TableField>
                <TableField value={"Last name"}>
                    <Input name={"last_name"} placeholder={"Smith"} value={lastname}
                           onChange={(e) => setLastname(e.target.value)}/>
                </TableField>
            </Table>
            <div className={css.action}>
                <SubmitButton>Save</SubmitButton>
            </div>
        </form>
    );
};