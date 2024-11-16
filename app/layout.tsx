import { Metadata } from "next";

import "./globals.css";



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