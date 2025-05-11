"use client";
import React from "react";
import useUser from "@/hooks/useUser";

export const IfIsAdmin = (props: {
    children?: React.ReactNode,
    ifNotAdmin?: React.ReactNode,
}) => {
    const {user, isLoading, isLoggedIn} = useUser();

    if (isLoading) return;
    if (!isLoggedIn) return;

    if (user.permission == 0) return props.ifNotAdmin;

    return (
        props.children
    );
};