"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductForm from "./ProductForm";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  category: { name: string };
};

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/seller/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        toast.error("Failed to load products");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/seller/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Product deleted");
        setProducts(products.filter(p => p.id !== id));
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      toast.error("An error occurred during deletion");
    }
  }

  const handleFormSuccess = () => {
    setIsAdding(false);
    setEditingProduct(null);
    fetchProducts();
  };

  if (isAdding || editingProduct) {
    return (
      <div style={{ background: "white", padding: "1.5rem", borderRadius: "10px", border: "1px solid #E8DDD8" }}>
        <ProductForm 
          product={editingProduct || undefined} 
          onSuccess={handleFormSuccess} 
          onCancel={() => { setIsAdding(false); setEditingProduct(null); }} 
        />
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "1.25rem", fontFamily: "var(--font-heading)", margin: 0 }}>
          Manage My Artisanal Goods
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          style={{
            padding: "0.6rem 1.25rem",
            background: "var(--color-primary)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "0.875rem"
          }}
        >
          Add New Product
        </button>
      </div>

      <div style={{ background: "white", border: "1px solid #E8DDD8", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "var(--color-background)", borderBottom: "1px solid #E8DDD8" }}>
            <tr>
              <th style={{ padding: "0.75rem 1rem", fontSize: "0.75rem", textTransform: "uppercase", color: "#7A5C58" }}>Product</th>
              <th style={{ padding: "0.75rem 1rem", fontSize: "0.75rem", textTransform: "uppercase", color: "#7A5C58" }}>Category</th>
              <th style={{ padding: "0.75rem 1rem", fontSize: "0.75rem", textTransform: "uppercase", color: "#7A5C58" }}>Price</th>
              <th style={{ padding: "0.75rem 1rem", fontSize: "0.75rem", textTransform: "uppercase", color: "#7A5C58" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "#666" }}>Loading your products...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "#666" }}>You haven't listed any products yet.</td></tr>
            ) : products.map(product => (
              <tr key={product.id} style={{ borderBottom: "1px solid #F5F5F5" }}>
                <td style={{ padding: "1rem", fontWeight: 600 }}>{product.name}</td>
                <td style={{ padding: "1rem", color: "#666" }}>{product.category?.name}</td>
                <td style={{ padding: "1rem", fontWeight: 500 }}>${Number(product.price).toFixed(2)}</td>
                <td style={{ padding: "1rem" }}>
                   <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button 
                         onClick={() => setEditingProduct(product)}
                         style={{ background: "none", border: "none", color: "var(--color-primary)", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}>
                         Edit
                      </button>
                      <button 
                         onClick={() => handleDelete(product.id)}
                         style={{ background: "none", border: "none", color: "#9F1239", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}>
                         Delete
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
