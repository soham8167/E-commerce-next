"use client";
import { useState } from "react";

export default function AddProductForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, image }),
    });

    onSuccess();
  }

  return (
    <form className="bg-white p-4 rounded shadow space-y-4 max-w-md" onSubmit={handleSubmit}>
      <input className="border p-2 w-full" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Price" onChange={(e)=>setPrice(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Image URL" onChange={(e)=>setImage(e.target.value)} />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Save Product
      </button>
    </form>
  );
}
