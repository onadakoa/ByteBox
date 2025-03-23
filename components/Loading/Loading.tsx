import css from "./Loading.module.css";
import {poppins} from "@/utils/font";

export function Loading() {
    return (
        <div style={poppins.style} className={css.container}>
            <span>Loading...</span>
        </div>
    );
}