import { Button, Spinner, Card, Badge } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Plus, NotepadText, Trash2, Pencil, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductTypeMap from "@/models/ProductTypeMap";

type ProductRecord = {
  id: number;
  name: string;
  price: number;
  type: string;
};

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/product");

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `Server returned ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Бүтээгдэхүүн харуулахад алдаа гарлаа:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Алдаа гарлаа. Дахин оролдоно уу."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-gray-600">Түр хүлээнэ үү...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg">
        <div className="text-red-600 font-medium mb-3">{error}</div>
        <Button
          variant="outline-primary"
          onClick={() => window.location.reload()}
          className="flex items-center gap-2"
        >
          Дахин оролдох
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <Card className="text-center py-8 border-0 shadow-sm">
        <Card.Body className="flex flex-col items-center">
          <NotepadText size={48} className="text-gray-800 mb-4" />
          <h5 className="text-lg font-semibold mb-2 text-gray-700">
            Бүртгэл байхгүй байна
          </h5>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Card.Body className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Badge
                  bg="info"
                  className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800"
                >
                  {ProductTypeMap[product.type] ?? product.type}
                </Badge>
                <div className="flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => router.push(`/product/${product.id}/edit`)}
                    className="p-1.5 rounded-full hover:bg-blue-50"
                  >
                    <Pencil size={16} className="text-blue-600" />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => router.push(`/product/${product.id}/detail`)}
                    className="p-1.5 rounded-full hover:bg-red-50"
                  >
                    <Eye size={16} className="text-green-600" />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="p-1.5 rounded-full hover:bg-red-50"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </Button>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {product.name}
              </h3>
              <div className="mt-4">
                <span className="text-2xl font-bold text-gray-700">
                  {product.price.toLocaleString()}₮
                </span>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function handleDelete(id: number) {
  if (confirm("Та энэ барааг устгахдаа итгэлтэй байна уу?")) {
    try {
      const response = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error("Устгах явцад алдаа гарлаа");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Устгах явцад алдаа гарлаа. Дахин оролдоно уу.");
    }
  }
}
