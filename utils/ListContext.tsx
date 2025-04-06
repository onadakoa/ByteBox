"use client";
import React, {createContext, useContext} from "react";

export type ListPropertiesType = {
    gridTemplateColumns?: string;
};
export const ListPropertiesContext = createContext<ListPropertiesType>({});

export function ListContextProvider(props: ListPropertiesType & { children: React.ReactNode }) {
    return (
        <ListPropertiesContext.Provider value={props}>
            {props.children}
        </ListPropertiesContext.Provider>
    );
}

export function useListContext() {
    return useContext(ListPropertiesContext);
}