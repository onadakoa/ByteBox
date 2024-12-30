import css from "./page.module.css"
import {AuthForm} from "@/components/Form/AuthForm";

export default function Page() {

    return (
        <div className={css.container}>
            <AuthForm/>
        </div>
    );
}