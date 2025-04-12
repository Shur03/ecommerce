"use client";
import { Button, Alert, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProduct({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    detail: "",
  });
  const PRODUCT_TYPES = [
    { type: "phone", name: "Утас" },
    { type: "device", name: "Төхөөрөмж" },
  ];
  const [state, setState] = useState<{
    message: string;
    success: boolean;
    errors?: Record<string, string[]>;
  }>({ message: "", success: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setFormData({
          name: data.name,
          price: data.price.toString(),
          type: data.type,
          detail: data.detail || "",
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        setState({
          message: "Алдаа гарлаа. Дахин оролдоно уу.",
          success: false,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/product/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setState({
          message: "Амжилттай шинэчлэгдлээ!",
          success: true,
        });
        router.push("/product");
      } else {
        setState({
          message: result.error || "Алдаа гарлаа, дахин оролдоно уу.",
          success: false,
          errors: result.errors,
        });
      }
    } catch (error) {
      setState({
        message: "Алдаа гарлаа. Дахин оролдоно уу.",
        success: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-sm text-gray-800">Ачаалж байна...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white text-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Бүтээгдэхүүн засварлах</h2>

      {state.message && (
        <Alert variant={state.success ? "success" : "danger"}>
          {state.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 ">
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
            maxLength={100}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline-secondary"
            onClick={() => router.back()}
            className="px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-gray-500"
          >
            Буцах
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            {isSubmitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Хадгалж байна...
              </>
            ) : (
              "Хадгалах"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
