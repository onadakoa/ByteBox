import React, {ReactNode} from "react";
import {Metadata} from "next";
import AdminNavBar from "@/components/NavBar/AdminNavBar";
import {ModalProvider} from "@/components/Modal/ModalProvider";
import {RequireAuth} from "@/components/Api/RequireAuth";

export const metadata: Metadata = {
    title: "Admin Dashboard",
}

export default function layout(props: { children: ReactNode }) {
    return (
        <ModalProvider>
            <RequireAuth type={"admin"}/>
            <AdminNavBar>
                {props.children}
            </AdminNavBar>
        </ModalProvider>
    );
}