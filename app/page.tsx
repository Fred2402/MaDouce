"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const SECRET_CODE = "Ma douce";

  const handleSubmit = () => {
    if (code === SECRET_CODE) {
      router.push("/home");
    } else {
      setMessage(
        "🌸 This is not the right code… take your time and try again 🌸"
      );
    }
  };

  return (
    <main
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/backgrounds/romantic-pattern.svg')",
        backgroundRepeat: "repeat",
        backgroundColor: "#fdf2f8",
      }}
    >
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold text-pink-600 mb-4">
          🌸 Welcome, my sweet
        </h1>

        <p className="text-gray-600 mb-6">
          Enter the secret code to access your safe place
        </p>

        {/* Input + eye icon */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Secret code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-pink-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 focus:outline-none"
          >
            👁️
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Enter 💖
        </button>

        {message && (
          <p className="mt-4 text-pink-600 font-medium">{message}</p>
        )}
      </div>
    </main>
  );
}
