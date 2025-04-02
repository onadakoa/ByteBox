import Image from "next/image";


export default function Logo({sizes}: { sizes?: string }) {
    return (<Image sizes={sizes} src={'/logo.svg'} alt="ByteBox Logo" fill/>);
}