"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "../../../../../lib/auth";

const prisma = new PrismaClient();

export async function create(formData: {
  name: string;
  price: number;
  type: string;
  detail: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      message: "Хэрэглэгчийн мэдээлэл олдсонгүй. Нэвтэрч орно уу.",
    };
  }
  try {
    const product = prisma.product.create({
      data: {
        name: formData.name,
        price: formData.price,
        type: formData.type,
        detail: formData.detail,
        owner_id: session.user.id, //Нэвтэрч орсон хэрэглэгч
      },
    });

    return { success: true, product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  } finally {
    await prisma.$disconnect();
  }
}
