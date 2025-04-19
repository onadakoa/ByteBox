import React, {ReactNode} from "react";
import {Metadata} from "next";
import AdminNavBar from "@/components/NavBar/AdminNavBar";
import {ModalProvider} from "@/components/Modal/ModalProvider";

export const metadata: Metadata = {
    title: "Admin Dashboard",
}

export default function layout(props: { children: ReactNode }) {
    return (
        <ModalProvider>
            <AdminNavBar>
                {props.children}
            </AdminNavBar>
        </ModalProvider>
    );
}