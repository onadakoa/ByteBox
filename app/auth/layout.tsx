import React from "react";
import css from "./layout.module.css"
import {AuthNavBar} from "@/components/NavBar/AuthNavBar";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "ByteBox auth"
}

export default function layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <AuthNavBar/>
            <main className={css.content}>
                {children}
            </main>
        </>
    );
}