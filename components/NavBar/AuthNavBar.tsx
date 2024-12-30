import css from "./AuthNavBar.module.css"
import Logo from "@/components/Logo/Logo";
import Link from "next/link";

export function AuthNavBar() {
    return (
        <div className={css.container}>
            <div></div>
            <div>
                <div className={css.logoContainer}>
                    <Link href={"/"}>
                        <Logo/>
                    </Link>
                </div>
            </div>
            <div></div>
        </div>
    );
}