"use client"
import css from "./AuthForm.module.css"
import {poppins, roboto} from "@/utils/font";
import {Input} from "@/components/Form/Input";
import {FormEventHandler, Fragment, useEffect, useState} from "react";
import {API_HOSTNAME} from "@/utils/api";
import {OutPacket} from "@/utils/OutPacket";
import {Loading} from "@/components/Loading/Loading";
import {useRouter} from "next/navigation";


export function AuthForm() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const Submit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = new FormData(event.target as HTMLFormElement);

        let href = API_HOSTNAME + ((isLogin) ? "login.php" : "register.php");

        const res = await fetch(href, {
            method: "POST",
            credentials: "include",
            body: data,
        })

        if (!res.ok) {
            let err = "error";

            try {
                const json: OutPacket = await res.json();
                err = json.d;
            } catch (err) {
                console.error(err)
            }

            console.error(`AuthForm FAILED: ${err}`);
            setError(err + ` (${res.status})`);
            setIsLoading(false);
            return;
        }

        const json: OutPacket = await res.json();

        if (json.c == 0)
            console.log(`AuthForm SUCCESS: ${json.d.login}`)
        else {
            console.error(`AuthForm FAILED: ${json}`);
            setError(json.d + ` (${res.status})`)
        }

        setIsLoading(false);
    }

    useEffect(() => {
        fetch(API_HOSTNAME, {
            credentials: "include",
        }).then(body => body.json().then((json: OutPacket) => {
            if (json.d.user != 0) {
                router.push("/");
                return;
            }
            setIsLoading(false);
        }))
    }, []);

    return (
        <div className={css.container}>
            <div className={css.formBody}>
                {(isLoading) ? (<>
                    <Loading/>
                </>) : (<>
                    <div style={poppins.style} className={css.formTitle}>
                        {(isLogin) ? "Zaloguj" : "Zarejestruj"}
                    </div>
                    <form onSubmit={Submit} style={roboto.style} className={css.formContent}>
                        {(isLogin) ? (<LoginFormProps/>) : (<RegisterFormProps/>)}

                        <div className={css.error}>
                            {(error) ? error : undefined}
                        </div>
                        <div className={css.submit}>
                            <input type="submit" value={(isLogin) ? "Zaloguj" : "Zarejestruj"}/>
                        </div>
                    </form>
                    <div style={poppins.style} className={css.modeChanger}>
                        {
                            (isLogin) ? "Nie masz konta?" : "Masz już konto?"
                        }
                        <span onClick={() => {
                            setIsLogin(!isLogin);
                            setError(null);
                        }}>{
                            (isLogin) ? "Zarejestruj" : "Zaloguj"
                        } się!</span>
                    </div>
                </>)}

            </div>
        </div>
    );
}

function LoginFormProps() {
    return (
        <>
            <div>Login</div>
            <div><Input name={"login"} type={"text"} placeholder={"John@example.com"}></Input></div>
            <div>Password</div>
            <div><Input name={'password'} type={"password"} placeholder={"Your pasword"}></Input></div>
        </>
    );
}

function RegisterFormProps() {
    return (<>
        <LoginFormProps/>
        <div>First Name</div>
        <div><Input name={"first_name"} type={"text"} placeholder={"John"}/></div>
        <div>Last Name</div>
        <div><Input name={"last_name"} type={"text"} placeholder={"Smith"}/></div>
    </>);
}