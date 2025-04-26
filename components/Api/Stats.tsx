"use client";

import useStats from "@/hooks/useStats";


export const Stats = (props: {
    children: string,
}) => {
    const {stats, error, isLoading} = useStats();

    if (isLoading) return (
        <>Loading...</>
    );
    if (error) {
        return <>{error.toString()}</>;
    }
    return (
        <>
            {stats.d[props.children]}
        </>
    );
};
