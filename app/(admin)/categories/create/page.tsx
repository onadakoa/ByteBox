"use client";
import React, { Suspense } from "react";
import CategoryEditor from "@/components/Category/CategoryEditor";

export default function CreateCategoryPage() {
    return (
        <div>
            <Suspense>
                <CategoryEditor/>
            </Suspense>
        </div>
    );
}