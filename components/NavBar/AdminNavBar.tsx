import css from "./AdminNavBar.module.css";
import Logo from "@/components/Logo/Logo";
import Link from "next/link";
import {IconLabel} from "@/components/Badge/IconLabel";
import Symbol from "@/components/MaterialSymbols/Symbol";
import {poppins} from "@/utils/font";

export default function AdminNavBar(props: { children?: React.ReactNode }) {
    return (
        <div className={css.container}>
            <div className={css.navBar}>
                <div>
                    <Link href={"/"}>
                        <Logo/>
                    </Link>
                </div>
            </div>
            <div className={css.icons} style={poppins.style}>
                <Link href={"/dashboard"}>
                    <IconLabel padding={"0.5rem 0"} ForceColumn IconComponent={<Symbol fontSize={"2rem"}>dashboard</Symbol>}>
                        Dashboard
                    </IconLabel>
                </Link>
            </div>
            <div className={css.content}>{props.children}</div>
        </div>
    );
}