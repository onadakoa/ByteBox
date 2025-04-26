"use client";
export const API_HOSTNAME = process.env.NEXT_PUBLIC_API_HOSTNAME || "http://localhost:8080";

export const FETCHER = (url: string) => fetch(url, {
    credentials: "include",
    method: "GET",
}).then(res => res.json());