"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import type { Category } from "@/app/lib/data";
import styles from "./page.module.css";

type FormProduct = {
  id: string;
  name: string;
  price: number;
  category: Exclude<Category, "All">;
  description: string;
  image: string;
};

type Props = {
  product: FormProduct;
  categories: Exclude<Category, "All">[];
};

export default function EditProductForm({ product, categories }: Props) {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [category, setCategory] = useState<Exclude<Category, "All">>(
    product.category,
  );
  const [description, setDescription] = useState(product.description);
  const [previewUrl, setPreviewUrl] = useState(product.image);
  const [saving, setSaving] = useState(false);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const form = e.target as HTMLFormElement;
      const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
      const file = fileInput?.files?.[0];

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("categoryId", product.category);
      
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch(`/api/seller/products/${product.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update product");
      }

      toast.success("Product updated successfully!");
      router.push(`/product/${product.id}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Product Name */}
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Product Name <span className={styles.required}>*</span>
        </label>
        <input
          id="name"
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="off"
        />
      </div>

      {/* Price */}
      <div className={styles.field}>
        <label htmlFor="price" className={styles.label}>
          Price (USD) <span className={styles.required}>*</span>
        </label>
        <div className={styles.inputPrefix}>
          <span className={styles.prefix}>$</span>
          <input
            id="price"
            type="number"
            min={0}
            step={0.01}
            className={styles.input}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Category */}
      <div className={styles.field}>
        <label htmlFor="category" className={styles.label}>
          Category <span className={styles.required}>*</span>
        </label>
        <div className={styles.selectWrapper}>
          <select
            id="category"
            className={styles.select}
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as Exclude<Category, "All">)
            }
            required
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <svg
            className={styles.selectChevron}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Description */}
      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>
          Description <span className={styles.required}>*</span>
        </label>
        <textarea
          id="description"
          className={styles.textarea}
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <p className={styles.hint}>
          Provide a detailed description of your product, including materials,
          dimensions, and unique features.
        </p>
      </div>

      {/* Product Image Upload */}
      <div className={styles.field}>
        <label htmlFor="imageFile" className={styles.label}>
          Product Image
        </label>
        <input
          id="imageFile"
          type="file"
          accept="image/*"
          className={styles.input}
          onChange={handleImageUpload}
        />
        <p className={styles.hint}>
          Upload a new image to replace the current one. Supported formats: JPG, PNG, WebP
        </p>
        {previewUrl && (
          <div className={styles.imagePreview}>
            <p className={styles.previewLabel}>Image Preview:</p>
            <div className={styles.previewWrapper}>
              <Image
                src={previewUrl}
                alt="Product preview"
                fill
                className={styles.previewImage}
                unoptimized
              />
            </div>
          </div>
        )}
      </div>

      {/* Form actions */}
      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={() => router.push(`/product/${product.id}`)}
        >
          Cancel
        </button>
        <button type="submit" className={styles.saveBtn} disabled={saving}>
          {saving ? (
            "Saving…"
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}
