"use client";

import React from "react";
import useUser from "@/hooks/useUser";

export const IfIsLoggedIn = (props: {
    children?: React.ReactNode,
    ifNotLogged?: React.ReactNode,
}) => {
    const {isLoggedIn, isLoading} = useUser();

    if (isLoading) return;
    if (!isLoggedIn) return props.ifNotLogged;

    return (
        props.children
    );
};