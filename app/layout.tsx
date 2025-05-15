import {Metadata} from "next";

import "./globals.css";
import "material-symbols";
import {SWRConfig} from "swr";
import {FETCHER} from "@/utils/api";


export const metadata: Metadata = {
    title: "ByteBox",
}


export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <html lang="pl">
        <body>
        <SWRConfig value={{
            fetcher: FETCHER,
            revalidateOnMount: true,
        }}>
            {children}
        </SWRConfig>
        </body>
        </html>
    )
}