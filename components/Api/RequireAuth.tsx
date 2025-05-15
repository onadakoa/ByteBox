"use client";

import {useRouter} from "next/navigation";
import useUser from "@/hooks/useUser";

export const RequireAuth = (props: {
    href?: string | "back",
    type: "admin" | "loggedIn" | "loggedOut",
}) => {
    const router = useRouter();
    const {isLoggedIn, user, error, isLoading} = useUser();
    if (isLoading) return (<></>);

    const route = () => {
        console.error("RequireAuth: ", "redirecting to '", props.href || "/", "'")
        if (props.href === "back") router.back();
        router.push(props.href || "/");
    }

    if (props.type === "loggedIn" && !isLoggedIn) {
        route();
    } else if (props.type === "admin" && (!isLoggedIn || user.permission === 0)) {
        route();
    } else if (props.type === "loggedOut" && isLoggedIn) {
        route();
    }

    return (<></>);
};