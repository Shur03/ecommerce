"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, Card, Spinner, Alert, Badge } from "react-bootstrap";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

// Define the product type
type Product = {
  id: number;
  name: string;
  price: number;
  type: string;
  detail: string | null;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string | null;
};

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/product/${params.id}`);

        if (!response.ok) {
          throw new Error("Бүтээгдэхүүний мэдээлэл авахад алдаа гарлаа");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : "Алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm("Та энэ бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?")) {
      return;
    }

    try {
      setDeleting(true);
      const response = await fetch(`/api/product/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Устгах явцад алдаа гарлаа");
      }

      router.push("/product");
    } catch (err) {
      console.error("Delete error:", err);
      setError(
        err instanceof Error ? err.message : "Устгах явцад алдаа гарлаа"
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spinner animation="border" variant="primary" />
        <span className="ml-2">Ачаалж байна...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert variant="danger">
          <Alert.Heading>Алдаа</Alert.Heading>
          <p>{error}</p>
          <Button
            variant="outline-danger"
            onClick={() => router.push("/product")}
          >
            Бүтээгдэхүүний жагсаалт руу буцах
          </Button>
        </Alert>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Alert variant="warning">
          <Alert.Heading>Бүтээгдэхүүн олдсонгүй</Alert.Heading>
          <Button
            variant="outline-warning"
            onClick={() => router.push("/product")}
          >
            Бүтээгдэхүүний жагсаалт руу буцах
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 text-gray-900">
        <Button
          variant="light"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Буцах
        </Button>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 flex items-center justify-center">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={400}
                height={400}
                className="object-contain max-h-[400px]"
              />
            ) : (
              <div className="text-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-32 h-32 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <p className="mt-2">Зураг байхгүй</p>
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {product.name}
              </h1>
              <Badge
                bg="info"
                className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800"
              >
                {product.type}
              </Badge>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {product.price.toLocaleString()}₮
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Тайлбар
              </h3>
              <p className="text-gray-600">
                {product.detail || "Тайлбар оруулаагүй"}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Бүртгэгдсэн
              </h3>
              <p className="text-gray-600">
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-3 mt-8 text-gray-900">
              <Button
                variant="primary"
                onClick={() => router.push(`/product/${product.id}/edit`)}
                className="flex items-center gap-2"
              >
                <Edit size={16} />
                Засах
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    Устгаж байна...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Устгах
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
