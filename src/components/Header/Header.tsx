// "use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut, User } from "lucide-react";
import { Button } from "react-bootstrap";
interface HeaderProps {
  email: string;
}
export default function Header({ email }: HeaderProps) {
  return (
    <header className="bg-gray-100 shadow-md p-4 rounded-lg mb-3">
      <div className="container mx-auto flex justify-between items-center rounded-lg ">
        <Link href={"/product"}>
          <Image
            src="/icon.png"
            alt="Logo"
            width={50}
            height={50}
            className=" rounded-2xl"
          />
        </Link>
        <h2>{email}</h2>
        <Button
          onClick={() => signOut()}
          className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
        >
          <User />
        </Button>
      </div>
    </header>
  );
}
