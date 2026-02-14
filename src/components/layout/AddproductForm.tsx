"use client";
import { useState } from "react";

export default function AddProductForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState("fruits");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", imageFile);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setTitle("");
        setPrice("");
        setImageFile(null);
        onSuccess();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="bg-white p-4 rounded shadow space-y-4 max-w-md"
      onSubmit={handleSubmit}
    >
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        required
      />

      <select
        className="border p-2 w-full"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="fruits">Fruits</option>
        <option value="veggies">Veggies</option>
        <option value="combo">Combo</option>
      </select>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Save Product"}
      </button>
    </form>
  );
}
