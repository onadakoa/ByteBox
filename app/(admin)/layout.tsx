import React, {ReactNode} from "react";
import {Metadata} from "next";
import AdminNavBar from "@/components/NavBar/AdminNavBar";

export const metadata: Metadata = {
    title: "Admin Dashboard",
}

export default function layout(props: {children: ReactNode}) {
    return (
        <AdminNavBar>
            R
        </AdminNavBar>
    );
}