"use client";

import ProductList from "@/components/Lists/ProductList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody } from "react-bootstrap";
export default function Page() {
  const router = useRouter();
  //   const { status } = useSession();
  //   if (status === "loading") {
  //     return (
  //       <div className="text-center py-5">
  //         <div className="spinner-border text-primary" role="status">
  //           <span className="visually-hidden">Түр хүлээнэ үү...</span>
  //         </div>
  //         <p className="mt-2">Түр хүлээнэ үү</p>
  //       </div>
  //     );
  //   }
  return (
    <Card>
      <CardBody>
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
      </CardBody>
    </Card>
  );
}
