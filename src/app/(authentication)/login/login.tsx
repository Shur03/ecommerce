"use client";

import {
  AtSign,
  CircleAlert,
  Link,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import { useLogin } from "@/app/hooks/useLogin";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { Button } from "react-bootstrap";
import { executeAction } from "../../../../lib/executeAction";

export default function Login() {
  const { submitting, error, handleLogin } = useLogin();
  const router = useRouter();
  const handleClick = () => {
    router.replace("/signup");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-50 flex items-center justify-center p-4">
      <div className="w-1/3 max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full  p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-700 mb-2 text-center">
            Нэвтрэх
          </h1>

          <form
            action={async (formData: FormData) => {
              await executeAction({
                actionFn: () => handleLogin(formData),
              });
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="email"
                  id="email"
                  required
                  disabled={submitting}
                  placeholder="Email оруулна уу"
                  className="block w-full pl-10 pr-3 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Нууц үг
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockKeyhole className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  minLength={6}
                  disabled={submitting}
                  placeholder="Нууц үгээ оруулна уу"
                  className="block w-full pl-10 pr-3 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            {error && (
              <div className="flex items-center p-4 bg-red-50 rounded-lg">
                <CircleAlert className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Нэвтэрч байна...
                </span>
              ) : (
                "Нэвтрэх"
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Бүртгэлгүй юу?{" "}
                <Button
                  type="button"
                  onClick={handleClick}
                  className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Бүртгүүлэх
                </Button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
