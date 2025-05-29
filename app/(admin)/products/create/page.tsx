import ProductEditor from "@/components/Product/ProductEditor";
import {Suspense} from "react";

export default function Page() {
    return (
        <Suspense>
            <ProductEditor/>
        </Suspense>
    );
}