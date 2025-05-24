import css from "./layout.module.css"
import NavBar from "@/components/NavBar/NavBar"
import {ModalProvider} from "@/components/Modal/ModalProvider";


export default function Layout({children}: { children: React.ReactNode }) {

    return (
        <ModalProvider>
            <NavBar/>
            <main className={css.container}>
                {children}
            </main>
        </ModalProvider>
    );
}