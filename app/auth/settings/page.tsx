import css from "./page.module.css"
import {poppins} from "@/utils/font";
import {Header} from "@/components/Header/Header";
import {Field} from "@/components/Field/Field";
import {UserSettings} from "@/components/Settings/UserSettings";
import {BillingAddressManager} from "@/components/Settings/BillingAddressManager";
import {LoginManager} from "@/components/Settings/LoginManager";
import {RequireAuth} from "@/components/Api/RequireAuth";

export default function Page() {
    return (<div className={css.mainContainer}>
        <RequireAuth type={"loggedIn"}/>
        <div className={css.container} style={poppins.style}>
            <Header>Settings</Header>
            <Field padding={"15px 20px"}>
                <UserSettings/>
            </Field>
            <Header>Billing address</Header>
            <Field padding={"15px 20px"}>
                <BillingAddressManager DontSelect/>
            </Field>
            <Header>Status</Header>
            <Field padding={"15px 20px"}>
                <LoginManager/>
            </Field>
        </div>
    </div>)
}