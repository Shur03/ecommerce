"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "react-bootstrap";
import { useRegister } from "../../hooks/useRegister";
import { LockKeyhole, Mail } from "lucide-react";

export default function SignUp() {
  const { register, loading, error } = useRegister();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    re_password: "",
  });
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      errors.email = "Email хаяг оруулна уу";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Хүчинтэй email хаяг оруулна уу";
    }

    if (!formData.password) {
      errors.password = "Нууц үг оруулна уу";
    } else if (formData.password.length < 6) {
      errors.password = "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой";
    }

    if (formData.password !== formData.re_password) {
      errors.re_password = "Нууц үг таарахгүй байна";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    try {
      await register(formData.email, formData.password);
      setSuccess(true);
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-1/3 max-w-4xl">
        {" "}
        <Card className="rounded-xl overflow-hidden shadow-lg border-0">
          <div className="bg-blue-700 p-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-50">
              Бүртгүүлэх
            </h1>
          </div>

          <CardBody className="p-0">
            <div className="flex ">
              <div className="w-full  p-6 sm:p-8">
                {success && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                    ✅ Амжилттай бүртгэгдлээ! Нэвтрэх хуудас руу шилжиж байна...
                  </div>
                )}

                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    ⚠️ {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-2.5 border text-gray-900 dark:gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Email оруулна уу"
                        required
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
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Нууц үг оруулна уу"
                        minLength={6}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="re_password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Нууц үг давтах
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockKeyhole className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="re_password"
                        name="re_password"
                        type="password"
                        value={formData.re_password}
                        onChange={handleChange}
                        className={`w-full pl-10 px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          validationErrors.re_password ? "border-red-500" : ""
                        }`}
                        placeholder="Нууц үг дахин оруулна уу"
                      />
                      {validationErrors.re_password && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors.re_password}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                      loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        Бүртгэж байна...
                      </span>
                    ) : (
                      "Бүртгүүлэх"
                    )}
                  </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center text-sm text-gray-600">
                  <p>
                    Бүртгэлтэй юу?{" "}
                    <button
                      onClick={() => router.push("/login")}
                      className="font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                    >
                      Нэвтрэх
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
