"use client";

import useStats from "@/hooks/useStats";
import {Loading} from "@/components/Loading/Loading";


export const Stats = (props: {
    children: string,
}) => {
    const {stats, error, isLoading} = useStats();

    if (isLoading || error) return (
        <Loading>-</Loading>
    );
    return (
        <>
            {(stats.d as any)[props.children]}
        </>
    );
};
