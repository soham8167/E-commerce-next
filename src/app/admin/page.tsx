"use client";

import AddProductForm from "@/components/layout/AddproductForm";
import { useState } from "react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <ul className="space-y-4">
          <li
            className={`cursor-pointer ${activeTab === "dashboard" ? "text-yellow-400" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </li>

          <li
            className={`cursor-pointer ${activeTab === "products" ? "text-yellow-400" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </li>

          <li
            className={`cursor-pointer ${activeTab === "orders" ? "text-yellow-400" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </li>

          <li
            className={`cursor-pointer ${activeTab === "users" ? "text-yellow-400" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "products" && <Products />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "users" && <Users />}
      </main>
    </div>
  );
}

/* COMPONENTS  */

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Products" value="0" />
        <Card title="Total Orders" value="0" />
        <Card title="Total Users" value="0" />
      </div>
    </div>
  );
}

function Products() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        Add New Product
      </button>

      {showForm && <AddProductForm onSuccess={() => setShowForm(false)} />}
    </div>
  );
}


function Orders() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="bg-white p-4 rounded shadow">
        <p>No orders yet.</p>
      </div>
    </div>
  );
}

function Users() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="bg-white p-4 rounded shadow">
        <p>No users yet.</p>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
