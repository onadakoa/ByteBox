"use client";
import {ManagerButton} from "@/components/Admin/ManagerButton";
import ListRow, {ListRowHeader} from "@/components/Table/ListRow";
import {ListCell} from "@/components/Table/ListCell";
import {Manager} from "@/components/Admin/Manager";
import React, {useEffect, useState} from "react";
import {useDebounce} from "@/hooks/useDebounce";
import {ICategory} from "@/utils/Category";

export const CategoriesManager = (props: {
    dontShowItemsAction?: boolean,
    dontShowAction?: boolean,
}) => {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const debouncedSearch = useDebounce(search, 500);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/categories/index.php${debouncedSearch ? `?search=${debouncedSearch}` : ''}`, {
                    credentials: "include",
                    method: "GET",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data.d || []);
                setError(null);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError(error instanceof Error ? error : new Error("Unknown error"));
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, [debouncedSearch]);

    return (
        <Manager gridTemplateColumns={"100px 1fr 150px"}
                 additionalButtons={
                     <>
                         <ManagerButton href="/categories/create">Add Category</ManagerButton>
                     </>
                 }
                 searchValue={search}
                 setSearchValue={(e) => setSearch(e.target.value)}
                 dontShowAction={props.dontShowAction}
        >
            <ListRowHeader>
                <ListCell>ID</ListCell>
                <ListCell>Name</ListCell>
                {!props.dontShowItemsAction && <ListCell centerHorizontal>Action</ListCell>}
            </ListRowHeader>
            {(isLoading || error) ? (
                <ListRow>
                    <ListCell centerHorizontal>
                        {isLoading ? "Loading..." : `Error: ${error?.message}`}
                    </ListCell>
                </ListRow>
            ) : categories.length === 0 ? (
                <ListRow>
                    <ListCell centerHorizontal>
                        No categories found
                    </ListCell>
                </ListRow>
            ) : categories.map((category) => (
                <ListRow key={category.id}>
                    <ListCell>#{category.id}</ListCell>
                    <ListCell>{category.name}</ListCell>
                    {!props.dontShowItemsAction && <ListCell centerHorizontal>
                        <ManagerButton href={`/categories/create?id=${category.id}`}>Edit</ManagerButton>
                    </ListCell>}
                </ListRow>
            ))}
        </Manager>
    );
};