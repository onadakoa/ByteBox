import css from "./page.module.css"
import {AuthForm} from "@/components/Form/AuthForm";
import {RequireAuth} from "@/components/Api/RequireAuth";

export default function Page() {

    return (
        <div className={css.container}>
            <RequireAuth type={"loggedOut"}/>
            <AuthForm/>
        </div>
    );
}