"use client";

import { useEffect, useState, FormEvent } from "react";
import toast from "react-hot-toast";

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const method = product?.id ? "PATCH" : "POST";
    const url = product?.id ? `/api/seller/products/${product.id}` : "/api/seller/products";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: Number(formData.price) }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Something went wrong");
      }

      toast.success(product?.id ? "Product updated!" : "Product added!");
      onSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputStyle = {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "1px solid var(--color-border)",
    fontSize: "1rem",
    outline: "none",
    width: "100%",
    fontFamily: "var(--font-body)",
    transition: "all 0.2s"
  };

  const labelStyle = {
    fontWeight: 600,
    fontSize: "0.875rem",
    color: "var(--color-text)",
    marginBottom: "0.25rem",
    display: "block"
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.25rem", padding: "1rem" }}>
      <header style={{ marginBottom: "0.5rem" }}>
        <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>
          {product?.id ? "Edit Product" : "Add New Artisan Product"}
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
          Share your craft with the Handcrafted Haven community.
        </p>
      </header>

      <div style={{ display: "grid", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Product Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Hand-turned Oak Bowl"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Category</label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              style={inputStyle}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Price ($)</label>
            <input
              type="number"
              step="0.01"
              required
              min="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Image URL</label>
          <input
            type="text"
            required
            placeholder="https://example.com/image.png"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
           <label style={labelStyle}>Description</label>
           <textarea
             required
             rows={4}
             placeholder="Tell the story of your handcrafted item..."
             value={formData.description}
             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
             style={{ ...inputStyle, resize: "none" }}
           />
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid var(--color-border)",
            background: "white",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            flex: 1,
            padding: "0.75rem",
            borderRadius: "8px",
            border: "none",
            background: "var(--color-primary)",
            color: "white",
            fontWeight: 600,
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? "Saving..." : (product?.id ? "Update Product" : "Publish Product")}
        </button>
      </div>
    </form>
  );
}
