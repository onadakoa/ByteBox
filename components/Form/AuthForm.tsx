"use client"
import css from "./AuthForm.module.css"
import {poppins, roboto} from "@/utils/font";
import {Input} from "@/components/Form/Input";
import {FormEventHandler, useState} from "react";


export function AuthForm() {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const Submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        console.log(data);
    }

    return (
        <div className={css.container}>
            <div className={css.formBody}>
                <div style={poppins.style} className={css.formTitle}>
                    {(isLogin) ? "Zaloguj" : "Zarejestruj"}
                </div>
                <form onSubmit={Submit} style={roboto.style} className={css.formContent}>
                    {(!isLogin) && (
                        <>
                            <div>Full name</div>
                            <div>
                                <Input name={"fullName"} placeholder={"John Smith"}/>
                            </div>
                        </>
                    )}
                    <div>E-mail</div>
                    <div>
                        <Input name={"email"} type={"email"} placeholder={"John@example.org"}/>
                    </div>
                    <div>Password</div>
                    <div>
                        <Input name={"password"} type={"password"} placeholder={"Your password"}/>
                    </div>
                    <div className={css.submit}>
                        <input type="submit" value={(isLogin) ? "Zaloguj" : "Zarejestruj"}/>
                    </div>
                </form>
                <div style={poppins.style} className={css.modeChanger}>
                    {
                        (isLogin) ? "Nie masz konta?" : "Masz już konto?"
                    } <span onClick={() => setIsLogin(!isLogin)}>{
                    (isLogin) ? "Zarejestruj" : "Zaloguj"
                } się!</span>
                </div>
            </div>
        </div>
    );
}