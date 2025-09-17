"use client";

import css from "./LoginManager.module.css";
import Button from "@/components/Button/Button";
import {useRouter} from "next/navigation";
import {useModal} from "@/utils/ModalContext";
import {Header} from "@/components/Header/Header";
import {mutate} from "swr";

export const LoginManager = () => {
    const router = useRouter();
    const [showModal, closeModal] = useModal();

    const logOut = async () => {
        const res = await fetch("/api/logout.php", {
            credentials: "include",
            method: "POST",
        })

        if (!res.ok) {
            console.error("LoginManager: ", `failed to fetch, C: ${res.status}`)
            return;
        }
        await mutate("/user/index.php");
        router.push("/");
    }
    const deleteAccount = async () => {
        const del = async () => {
            //TODO
        }
        showModal((<div className={css.container}>
            <Header size={"1.1rem"}>Are you sure?</Header>
            <Button onClick={del} backgroundColor={"var(--yellow-color)"}>I want to DELETE my account</Button>
            <Button onClick={closeModal}>Cancel</Button>
        </div>));
    }

    return (
        <div className={css.container}>
            <Button
                onClick={logOut}
                backgroundColor={"var(--yellow-color)"}
            >Log Out</Button>
            {/*<Button*/}
            {/*    onClick={deleteAccount}*/}
            {/*    backgroundColor={"var(--red-color)"}*/}
            {/*>Delete account</Button>*/}
        </div>
    );
};