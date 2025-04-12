import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { auth } from '../../../../lib/auth'; 

export async function GET() {
  // const session = await auth();
  // if (!session?.user?.id) {
  //   return NextResponse.json(
  //     { 
  //       success: false,
  //       message: "Хэрэглэгчийн мэдээлэл олдсонгүй. Нэвтэрч орно уу."
  //     },
  //     { status: 401 }
  //   );
  // }

  try {
    const products = await prisma.product.findMany({
      // where : {
      //   owner_id : session.user.id
      // },
      orderBy: { id: 'asc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        error: 'Database error',
        message: 'Өгөгдлийн сангийн алдаа гарлаа'
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  // const session = await auth();
  // if (!session?.user?.id) {
  //   return NextResponse.json(
  //     { 
  //       error: "Unauthorized",
  //       message: "Нэвтэрч орно уу"
  //     },
  //     { status: 401 }
  //   );
  // }

  try {
    const body = await req.json();
    const { name, price, type, detail } = body;
    if (!name || !price || !type) {
      return NextResponse.json(
        { 
          error: "Validation error",
          message: "Бүх шаардлагатай талбарыг бөглөнө үү"
        },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        type,
        detail: detail || null,
        owner_id: 1 , //owner_id : session.user.id байх ёстой ч хэрэгжүүлж чадаагүй.
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json(
      { 
        error: "Internal Server Error",
        message: "Серверийн алдаа гарлаа"
      },
      { status: 500 }
    );
  }
}