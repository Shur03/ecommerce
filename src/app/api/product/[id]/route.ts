import { NextResponse } from "next/server"
import prisma from "../../../../../lib/prisma"


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // const session = await auth()
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }
    if (!params?.id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const id = Number.parseInt(params.id, 10)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const body = await request.json()

    const { name, price, type, detail } = body

    const errors: Record<string, string[]> = {}

    if (!name || typeof name !== "string" || name.length > 20) {
      errors.name = ["Нэр шаардлагатай ба 20 тэмдэгтээс хэтрэх ёсгүй"]
    }

    if (typeof price !== "number" || isNaN(price) || price < 0) {
      errors.price = ["Зөв үнийг оруулна уу"]
    }

    if (!type || typeof type !== "string") {
      errors.type = ["Төрөл шаардлагатай"]
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 })
    }
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        type,
        detail: detail || null,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error: any) {
    console.error("Error updating product:", error)

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? error.message || "Failed to update product"
            : "Failed to update product",
      },
      { status: 500 },
    )
  }
}
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const id = Number.parseInt(params.id, 10)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error: any) {
    console.error("Error fetching product:", error)

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? error.message || "Failed to fetch product"
            : "Failed to fetch product",
      },
      { status: 500 },
    )
  }
}
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const id = Number.parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? error.message || "Failed to delete product"
            : "Failed to delete product",
      },
      { status: 500 }
    );
  }
}
