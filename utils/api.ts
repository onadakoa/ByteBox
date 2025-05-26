"use client";
import {OutPacket} from "@/utils/OutPacket";

export const API_HOSTNAME = "/api/";

export class JsonError extends Error {
    status: number;
    data: OutPacket<string>

    constructor(status: number, data: any) {
        super();
        this.status = status;
        this.data = data;
    }
}

export const FETCHER = async (url: string) => {
    let res = await fetch(API_HOSTNAME + url, {
        credentials: "include",
        method: "GET",
    });

    if (res.headers.get("Content-Type") != "application/json") {
        throw new Error("Invalid content type");
    }
    if (!res.ok) {
        throw new JsonError(res.status, await res.json())
    }

    return await res.json();
}
