import css from "./layout.module.css"
import NavBar from "@/components/NavBar/NavBar"


export default function Layout({children}: { children: React.ReactNode }) {

    return (<>
        <NavBar/>
        <main className={css.container}>
            {children}
        </main>
    </>)
}