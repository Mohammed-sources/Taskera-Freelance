"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { motion } from "framer-motion";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface JwtPayload {
    user_role: string;
    email_confirmed: string;
    email: string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://taskera.runasp.net/api/Auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const message = data?.message || "Invalid email or password.";
        throw new Error(message);
      }

      if (!data.token) {
        throw new Error("No token returned from server.");
      }

      localStorage.setItem("token", data.token);

      const decode: JwtPayload = jwtDecode(data.token);
      const role =
        decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      if (role === "Admin") {
        window.location.href = "/admin/";
      } else if (role === "Client") {
        window.location.href = "/user/";
      } else if (role === "Freelancer") {
        window.location.href = "/freelancer/";
      } else {
        window.location.href = "/pages/signin/page";
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="h-screen bg-gray-200 flex"
    >
        <div className="flex justify-start items-center bg-cream-white w-[55%] mx-auto my-auto relative">
          <div className="w-2/3 max-w-md p-10 mr-16">
            <h1 className="text-3xl font-heading text-primaryPurple text-center mb-2">
              Sign In
            </h1>
            <p className="text-center text-neutralBlack font-subtitle opacity-80 mb-6">
              Welcome back! Please log in to your account.
            </p>

            {error && (
              <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 font-body">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentTeal text-neutralBlack hover:shadow-soft-orange hover:shadow-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentTeal text-neutralBlack hover:shadow-soft-orange hover:shadow-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primaryPurple hover:bg-bright-magenta hover:shadow-md hover:shadow-primary-purple text-black font-semibold py-3 rounded-lg transition"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="my-6 flex items-center text-sm text-neutralBlack opacity-70">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleOAuth("google")}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-3 font-body hover:bg-warm-yellow transition"
              >
                <FcGoogle size={20} />
                Sign in with Google
              </button>

              <button
                onClick={() => handleOAuth("github")}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-3 font-body hover:bg-warm-yellow transition"
              >
                <FaGithub size={20} />
                Sign in with GitHub
              </button>
            </div>

            <p className="text-sm text-center mt-6 font-subtitle">
              Don’t have an account?{" "}
              <a
                href="/pages/signup"
                className="text-primaryPurple font-bold hover:underline hover:text-shadow-md hover:text-shadow-primary-purple"
              >
                Sign up
              </a>
            </p>
          </div>
          <div className="bg-soft-orange pl-96 rounded-l-full absolute inset-y-0 right-0"></div>
        </div>
    </motion.section>
  );
};

export default SignIn;