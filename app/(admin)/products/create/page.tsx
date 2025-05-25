"use client";
import React, {useEffect, useState} from "react";
import {Card} from "@/components/Field/Card";
import {poppins} from "@/utils/font";
import css from "./page.module.css";
import {ICategory} from "@/utils/Category";
import Image from "next/image";

export default function CreateProductPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories/index.php");
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data.d || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // Limit to 4 files
            const files = Array.from(e.target.files).slice(0, 4);

            // Update selected files
            setSelectedImages(files);

            // Create preview URLs for each file
            const newPreviewUrls: string[] = [];

            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviewUrls.push(reader.result as string);
                    if (newPreviewUrls.length === files.length) {
                        setPreviewUrls(newPreviewUrls);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            // First upload the images if selected
            let attachmentId = null;
            if (selectedImages.length > 0) {
                const imageFormData = new FormData();

                // Append each image to the form data
                selectedImages.forEach((image, index) => {
                    imageFormData.append(`image${index}`, image);
                });

                const attachmentResponse = await fetch("/api/attachments/upload.php", {
                    method: "POST",
                    body: imageFormData,
                });

                if (!attachmentResponse.ok) {
                    throw new Error("Failed to upload images");
                }

                const attachmentData = await attachmentResponse.json();
                attachmentId = attachmentData.d.attachment_id;
            }

            // Then create the product
            const productData = {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock),
                category_id: categoryId,
                attachment_id: attachmentId,
            };

            const response = await fetch("/api/products/create.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error("Failed to create product");
            }

            // Success
            setMessage("Product created successfully!");
            // Reset form
            setName("");
            setDescription("");
            setPrice("");
            setStock("");
            setCategoryId(null);
            setSelectedImages([]);
            setPreviewUrls([]);
        } catch (error) {
            console.error("Error creating product:", error);
            setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={[poppins.className, css.container].join(" ")}>
            <h1 className={css.title}>Create New Product</h1>

            <Card>
                <form onSubmit={handleSubmit} className={css.form}>
                    {/* Image Selector */}
                    <div className={css.formGroup}>
                        <label className={css.label}>Product Images (Up to 4)</label>
                        <div className={css.imageSelector}>
                            <div className={css.imagePreviewGrid}>
                                {previewUrls.length > 0 ? (
                                    previewUrls.map((url, index) => (
                                        <div key={index} className={css.imagePreview}>
                                            <Image
                                                src={url}
                                                alt={`Product preview ${index + 1}`}
                                                width={200}
                                                height={200}
                                                style={{objectFit: "cover"}}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className={css.imagePreview}>
                                        <div className={css.placeholderImage}>
                                            <span>No images selected</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={css.fileInputContainer}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className={css.fileInput}
                                />
                                <p className={css.helperText}>
                                    {selectedImages.length > 0
                                        ? `${selectedImages.length} ${selectedImages.length === 1 ? 'image' : 'images'} selected (max 4)`
                                        : 'Select up to 4 images'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product Name */}
                    <div className={css.formGroup}>
                        <label htmlFor="name" className={css.label}>Product Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={css.input}
                        />
                    </div>

                    {/* Product Description */}
                    <div className={css.formGroup}>
                        <label htmlFor="description" className={css.label}>Product Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className={css.textarea}
                            rows={5}
                        />
                    </div>

                    {/* Price */}
                    <div className={css.formGroup}>
                        <label htmlFor="price" className={css.label}>Price</label>
                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className={css.input}
                        />
                    </div>

                    {/* Stock */}
                    <div className={css.formGroup}>
                        <label htmlFor="stock" className={css.label}>Stock</label>
                        <input
                            id="stock"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                            className={css.input}
                        />
                    </div>

                    {/* Category Selector */}
                    <div className={css.formGroup}>
                        <label htmlFor="category" className={css.label}>Category</label>
                        <select
                            id="category"
                            value={categoryId || ""}
                            onChange={(e) => setCategoryId(e.target.value ? parseInt(e.target.value) : null)}
                            className={css.select}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className={css.formGroup}>
                        <button
                            type="submit"
                            className={css.submitButton}
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating..." : "Create Product"}
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
