"use client"
import css from "./ImageSelector.module.css"
import Image from "next/image";
import {CSSProperties, useEffect, useState} from "react";
import {Attachment} from "@/utils/Attachment";

function Item(props: { href: string, active?: boolean, onClick?: () => void }) {
    const style: CSSProperties = {
        border: "2px solid var(--primary-color)"
    }
    return (<div style={(props.active) ? style : undefined} onClick={props.onClick}>
        <Image src={props.href} alt={"picture of product"} fill style={{objectFit: "contain"}}/>
    </div>);
}

export function ImageSelector(props: { attachment_id?: number }) {
    const [images, setImages] = useState([
        "https://placehold.co/600x600",
        "https://placehold.co/400x600",
        "https://placehold.co/600x400",
        "https://placehold.co/300x400",
    ])
    const [pointer, setPointer] = useState(0);

    useEffect(() => {
        if (!props.attachment_id) return;
        Attachment.fetchById(props.attachment_id).then(att => {
            let nImages: string[] = [];
            att.getImages().forEach(img => {
                nImages.push(img.getURL())
            })
            setImages(nImages);
        })
    }, [props.attachment_id]);

    return (
        <div className={css.container}>
            <div className={css.main}>
                <div>
                    <div>
                        <Image src={images[pointer]} alt={"picture of product"} fill style={{objectFit: "contain"}}/>
                    </div>
                </div>
            </div>
            <div className={css.list}>
                {
                    images.map((image, i) => (
                        <Item key={i} href={image} active={i == pointer} onClick={() => {
                            setPointer(i)
                        }}/>
                    ))
                }
            </div>
        </div>
    );
}