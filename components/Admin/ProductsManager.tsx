"use client";
import {ManagerButton} from "@/components/Admin/ManagerButton";
import ListRow, {ListRowHeader} from "@/components/Table/ListRow";
import {ListCell} from "@/components/Table/ListCell";
import {Manager} from "@/components/Admin/Manager";
import React from "react";
import useProductList from "@/hooks/useProductList";
import {useDebounce} from "@/hooks/useDebounce";

export const ProductsManager = (props: {
    dontShowItemsAction?: boolean,
    dontShowAction?: boolean,
}) => {
    const [search, setSearch] = React.useState("");
    const debouncedSearch = useDebounce(search, 500);
    const {isLoading, error, products, mutate} = useProductList({search: debouncedSearch});

    const onDelete = async (id: string) => {
        const res = await fetch(`/api/products/index.php?id=${id}`, {
            credentials: "include",
            method: "DELETE"
        })
        if (res.ok) {
            await mutate();
        } else {
            console.error("error deleting product")
        }
    }

    return (
        <Manager gridTemplateColumns={"100px 1fr 100px 200px"}
                 additionalButtons={
                     <>
                         <ManagerButton href="/products/create">Add item</ManagerButton>
                     </>
                 }
                 searchValue={search}
                 setSearchValue={(e) => setSearch(e.target.value)}
                 dontShowAction={props.dontShowAction}
        >
            <ListRowHeader>
                <ListCell>id</ListCell>
                <ListCell>name</ListCell>
                <ListCell>price</ListCell>
                {!props.dontShowItemsAction && <ListCell centerHorizontal>action</ListCell>}
            </ListRowHeader>
            {(isLoading || error) ? undefined : products.map((product) => (
                <ListRow key={product.product_id}>
                    <ListCell>#{product.product_id}</ListCell>
                    <ListCell>{product.name}</ListCell>
                    <ListCell>{product.price}zł</ListCell>
                    {!props.dontShowItemsAction && <ListCell centerHorizontal>
                        <ManagerButton href={`/products/create?id=${product.product_id}`}>Edit</ManagerButton>
                        -
                        <ManagerButton onClick={() => {onDelete(product.product_id.toString())}}>Delete</ManagerButton>
                    </ListCell>}
                </ListRow>
            ))}
        </Manager>
    );
};