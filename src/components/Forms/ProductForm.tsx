"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Spinner } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";

export default function ProductForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    detail: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const PRODUCT_TYPES = [
    { type: "phone", name: "Утас" },
    { type: "device", name: "Төхөөрөмж" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Нэвтэрч орно уу");
        }

        try {
          const errorData = await response.json();
          throw new Error(errorData.error || "Алдаа гарлаа");
        } catch (jsonError) {
          throw new Error(`Алдаа гарлаа: ${response.statusText}`);
        }
      }

      const data = await response.json();
      router.push("/product");
    } catch (err) {
      console.error("Product registration error:", err);
      setError(err instanceof Error ? err.message : "Алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full md:w-1/2 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="light"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={18} />
            Буцах
          </Button>
        </div>

        <Card className="border-0 shadow-sm overflow-hidden rounded-lg">
          <Card.Body className="p-0">
            {error && (
              <div className="bg-red-50 text-red-600 px-6 py-4 border-b border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 text-gray-900">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Бүтээгдэхүүний нэр
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Үнэ (₮)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      required
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pl-12"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">₮</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Төрөл
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">-- Сонгох --</option>
                    {PRODUCT_TYPES.map((product) => (
                      <option key={product.type} value={product.type}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Нэмэлт тайлбар
                  </label>
                  <textarea
                    name="detail"
                    value={formData.detail}
                    onChange={handleChange}
                    rows={3}
                    maxLength={300}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => router.back()}
                  className="px-6 py-2 bg-blue-400 text-white rounded-lg"
                >
                  Буцах
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="px-6 py-2 flex items-center gap-2 bg-green-400 text-white rounded-lg"
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Хадгалж байна...
                    </>
                  ) : (
                    <>Хадгалах</>
                  )}
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
