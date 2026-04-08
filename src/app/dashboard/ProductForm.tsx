"use client";

import { useEffect, useState, FormEvent } from "react";
import toast from "react-hot-toast";
import styles from "./ProductForm.module.css";

type Category = {
  id: string;
  name: string;
};

type Product = {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
};

type ProductFormProps = {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(product?.imageUrl || "");
  const [formData, setFormData] = useState<Product>(product || {
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    categoryId: ""
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
          if (!product && data.length > 0) {
            setFormData(prev => ({ ...prev, categoryId: data[0].id }));
          }
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to load categories";
        toast.error(message);
      }
    }
    fetchCategories();
  }, [product]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const method = product?.id ? "PATCH" : "POST";
    const url = product?.id ? `/api/seller/products/${product.id}` : "/api/seller/products";

    try {
      const form = e.target as HTMLFormElement;
      const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
      const file = fileInput?.files?.[0];

      const body = new FormData();
      body.append("name", formData.name);
      body.append("description", formData.description);
      body.append("price", String(formData.price));
      body.append("categoryId", formData.categoryId);
      if (file) {
        body.append("file", file);
      }

      const res = await fetch(url, {
        method,
        body,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Something went wrong");
      }

      toast.success(product?.id ? "Product updated successfully!" : "Product published successfully!");
      onSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <header className={styles.formHeader}>
        <h3 className={styles.formTitle}>
          {product?.id ? "Edit Product" : "Add New Artisan Product"}
        </h3>
        <p className={styles.formDescription}>
          Share your craft with the Handcrafted Haven community. Fill in all required fields to get started.
        </p>
      </header>

      {/* Product Name */}
      <div className={styles.field}>
        <label className={styles.label}>
          Product Name <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          required
          className={styles.input}
          placeholder="e.g. Hand-turned Oak Bowl"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      {/* Category & Price Row */}
      <div className={styles.fieldGrid}>
        <div className={styles.field}>
          <label className={styles.label}>
            Category <span className={styles.required}>*</span>
          </label>
          <select
            required
            className={styles.select}
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Price ($) <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            step="0.01"
            required
            min="0.01"
            className={styles.input}
            placeholder="0.00"
            value={formData.price || ""}
            onChange={(e) => setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : 0 })}
          />
        </div>
      </div>

      {/* Product Image Upload */}
      <div className={styles.field}>
        <label className={styles.label}>
          Product Image
        </label>
        <div className={styles.fileInputWrapper}>
          <label className={styles.fileInputLabel}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={20} height={20}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>Click to upload or drag and drop</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className={styles.fileInputHidden}
            onChange={handleImageUpload}
          />
        </div>
        <p className={styles.hint}>
          PNG, JPG, WebP up to 10MB. Recommended size: 1000x750px
        </p>

        {previewUrl && (
          <div className={styles.imagePreview}>
            <p className={styles.previewLabel}>Image Preview</p>
            <div className={styles.previewContainer}>
              <img 
                src={previewUrl} 
                alt="Preview" 
                className={styles.previewImage}
              />
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div className={styles.field}>
        <label className={styles.label}>
          Description <span className={styles.required}>*</span>
        </label>
        <textarea
          required
          className={styles.textarea}
          placeholder="Tell the story of your handcrafted item. Include materials, dimensions, care instructions, and what makes it special..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <p className={styles.hint}>
          Minimum 50 characters recommended for better product visibility
        </p>
      </div>

      {/* Form Actions */}
      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          {isSubmitting ? "Saving..." : (product?.id ? "Update Product" : "Publish Product")}
        </button>
      </div>
    </form>
  );
}
