import { Metadata } from "next";

import "./globals.css";
import "material-symbols";




export const metadata: Metadata = {
    title: "ByteBox",
}


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pl">
            <body>
                {children}
            </body>
        </html>
    )
}