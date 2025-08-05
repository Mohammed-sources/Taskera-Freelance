"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SignUP = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Client"); // or "Freelancer"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://taskera.runasp.net/api/Auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, password, role }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Registration failed.");
      }

      setSuccess(
        "Registration successful! Please check your email to confirm your account."
      );
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="h-screen bg-gray-200 flex"
    >
        <div className="flex justify-end items-center bg-white w-[55%] mx-auto my-auto relative">
          {/* FORM */}
          <div className="w-2/3 max-w-md p-10 ml-16">
            <h1 className="text-3xl font-heading text-accentTeal text-center mb-2">
              Sign Up
            </h1>
            <p className="text-center text-neutralBlack font-subtitle opacity-80 mb-6">
              Create your account to get started
            </p>

            {error && (
              <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 text-green-600 px-4 py-2 rounded-lg mb-4 text-sm text-center">
                {success}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4 font-body">
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-1 text-sm font-medium"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryPurple text-neutralBlack hover:shadow-warm-yellow hover:shadow-md"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Doe"
                />
              </div>

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
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryPurple text-neutralBlack hover:shadow-warm-yellow hover:shadow-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john@example.com"
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
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryPurple text-neutralBlack hover:shadow-warm-yellow hover:shadow-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block mb-1 text-sm font-medium"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryPurple text-neutralBlack"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Client">Client</option>
                  <option value="Freelancer">Freelancer</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-primaryPurple hover:bg-bright-magenta hover:shadow-md hover:shadow-primary-purple text-black font-semibold py-3 rounded-lg transition"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-sm text-center mt-6 font-subtitle">
              Already have an account?{" "}
              <a
                href="/pages/signin"
                className="text-accentTeal font-bold hover:underline hover:text-shadow-md hover:text-shadow-primary-purple"
              >
                Sign in
              </a>
            </p>
          </div>

          <div className="bg-soft-orange pr-96 rounded-l-full absolute inset-y-0 left-0"></div>
        </div>
    </motion.section>
  );
};

export default SignUP;