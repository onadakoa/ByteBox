import React, {createContext, useContext} from "react";

export type ModalData = {
    showModal: (children: React.ReactNode) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalData>({showModal: () => 0, closeModal: () => 0});


export function useModal(): [(children: React.ReactNode) => void, () => void] {
    const ctx = useContext(ModalContext);

    return [ctx.showModal, ctx.closeModal];
}
