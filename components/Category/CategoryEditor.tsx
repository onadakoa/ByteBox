"use client";
import React, {useEffect, useState} from "react";
import {Card} from "@/components/Field/Card";
import {poppins} from "@/utils/font";
import css from "./CategoryEditor.module.css";
import {Category, ICategoryAlias} from "@/utils/Category";
import {OutPacket} from "@/utils/OutPacket";
import {useSearchParams} from "next/navigation";
import {mutate} from "swr";

export default function CategoryEditor() {
    const SearchParams = useSearchParams();
    const id = SearchParams.get("id");
    const [mode, setMode] = useState<"create" | "edit">(((id) ? "edit" : "create"));

    const [name, setName] = useState("");
    const [aliases, setAliases] = useState<ICategoryAlias[]>([]);
    const [newAlias, setNewAlias] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch category data if in edit mode
    useEffect(() => {
        if (mode !== "edit" || !id) return;

        const fetchCategory = async () => {
            setIsLoading(true);
            try {
                const category = await Category.getById(parseInt(id));
                setName(category.name);
                setAliases(category.alias || []);
            } catch (error) {
                console.error("Error fetching category:", error);
                setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategory();
    }, [mode, id]);

    const handleAddAlias = () => {
        if (!newAlias.trim()) return;

        // Create a temporary alias with a negative ID (will be replaced by server-generated ID)
        const tempAlias: ICategoryAlias = {
            alias_id: -Date.now(), // Temporary negative ID
            name: newAlias.trim()
        };

        setAliases([...aliases, tempAlias]);
        setNewAlias("");
    };

    const handleRemoveAlias = async (aliasId: number) => {
        const res = await fetch("/api/categories/alias.php?id=" + aliasId, {
            credentials: "include",
            method: "DELETE"
        })
        if (!res.ok) {
            setMessage("Failed to delete alias");
        }
        setAliases(aliases.filter(alias => alias.alias_id !== aliasId));
        setMessage(`Alias ${aliasId} deleted successfully!`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            // Create or update the category
            const categoryForm = new FormData();
            categoryForm.append("name", name);
            const categoryData = {
                name,
                id: id ? parseInt(id) : undefined
            };

            // Create or update category
            const categoryResponse = await fetch("/api/categories/index.php", {
                method: mode === "create" ? "POST" : "PUT",
                credentials: "include",
                body: mode === "create" ? categoryForm : JSON.stringify(categoryData)
            });

            if (!categoryResponse.ok) {
                throw new Error("Failed to save category");
            }

            const categoryResult = await categoryResponse.json() as OutPacket<{ id: number }>;
            const categoryId = mode === "create" ? categoryResult.d.id : parseInt(id!);

            // Handle aliases - create new ones and update existing ones
            for (const alias of aliases) {
                if (alias.alias_id < 0) {
                    // New alias to create
                    await fetch("/api/categories/alias.php", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: new URLSearchParams({
                            alias: alias.name,
                            category_id: categoryId.toString()
                        })
                    });
                } else if (mode === "edit") {
                    // Existing alias to update
                    await fetch("/api/categories/alias.php", {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: alias.alias_id,
                            alias: alias.name,
                            category_id: categoryId
                        })
                    });
                }
            }

            // Success
            setMessage(`Category ${mode === "create" ? "created" : "updated"} successfully!`);

            if (mode === "create") {
                // Reset form for create mode
                setName("");
                setAliases([]);
            }

            // Refresh data
            await mutate("/categories/index.php");
        } catch (error) {
            console.error(`Error ${mode === "create" ? "creating" : "updating"} category:`, error);
            setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={[poppins.className, css.container].join(" ")}>
            <h1 className={css.title}>{mode === "create" ? "Create New Category" : "Edit Category"}</h1>

            <Card>
                <form onSubmit={handleSubmit} className={css.form}>
                    {/* Category Name */}
                    <div className={css.formGroup}>
                        <label htmlFor="name" className={css.label}>Category Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={css.input}
                        />
                    </div>

                    {/* Aliases Section */}
                    <div className={css.formGroup}>
                        <label className={css.label}>Aliases</label>

                        {/* Alias List */}
                        <div className={css.aliasList}>
                            {aliases.length > 0 ? (
                                aliases.map((alias) => (
                                    <div key={alias.alias_id} className={css.aliasItem}>
                                        <span>{alias.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveAlias(alias.alias_id)}
                                            className={css.removeButton}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className={css.emptyMessage}>No aliases added</div>
                            )}
                        </div>

                        {/* Add New Alias */}
                        <div className={css.addAliasContainer}>
                            <input
                                type="text"
                                value={newAlias}
                                onChange={(e) => setNewAlias(e.target.value)}
                                placeholder="Enter new alias"
                                className={css.input}
                            />
                            <button
                                type="button"
                                onClick={handleAddAlias}
                                className={css.addButton}
                            >
                                Add Alias
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className={css.formGroup}>
                        <button
                            type="submit"
                            className={css.submitButton}
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save Category"}
                        </button>
                    </div>

                    {/* Status Message */}
                    {message && (
                        <div className={css.message}>
                            {message}
                        </div>
                    )}
                </form>
            </Card>
        </div>
    );
}