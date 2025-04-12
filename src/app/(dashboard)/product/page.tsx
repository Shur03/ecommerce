"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProductList from "@/components/Lists/ProductList";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody } from "react-bootstrap";
import { auth } from "../../../../lib/auth";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";
import Login from "@/app/(authentication)/login/login";
export default async function Page() {
  const router = useRouter();
  //Энэ хэсэгт session ашиглах гэсэн боловч сайн хэрэгжүүлж чадаагүй. Хэрэв нэвтэрч орсон хэрэглэгчийн
  // session хэрэглэвэл барааг хэрэглэгч дээр бүртгэх, хэрэглэгч дээрх барааг харуулах боломжтой.
  // const session = await auth();
  // const { data: session, status } = useSession();
  // if (!session) {
  //   return (
  //     <div>
  //       <Login />
  //     </div>
  //   );
  // }
  return (
    <Card>
      <CardBody>
        {/* <Header email={session.user?.email || "Guest"} /> */}
        <Header email={"test@gmail.com"} />
        <div className="mb-3 text-end pt-5">
          <Button
            variant="success"
            className="text-white bg-green-400 rounded-lg p-2 "
            onClick={() => router.push("/product/create")}
          >
            + Бүртгэл нэмэх
          </Button>
        </div>
        <h2 className="text-gray-900">List</h2>
        <ProductList />
        <Footer />
      </CardBody>
    </Card>
  );
}
