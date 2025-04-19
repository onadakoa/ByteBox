"use client";
import {ReactNode, useState} from "react";
import {ModalContext} from "@/utils/ModalContext";
import {Modal} from "@/components/Modal/Modal";

export function ModalProvider(props: {
    children?: ReactNode
}) {
    const [modalChildren, setModalChildren] = useState<ReactNode>();
    const [show, setShow] = useState<boolean>(false);

    const showModal = (children?: ReactNode) => {
        setModalChildren(children);
        setShow(true);
    }
    const closeModal = () => {
        setShow(false);
    }

    return (
        <ModalContext.Provider
            value={
                {showModal: showModal, closeModal: closeModal}
            }>
            {props.children}
            <Modal show={show}>{modalChildren}</Modal>
        </ModalContext.Provider>
    );
}