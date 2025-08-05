"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  user_role: string;
  email_confirmed: string;
  email: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

const OAuthPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Register state
  const [fullName, setFullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [role, setRole] = useState(0);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const switchToLogin = () => {
    setDirection("right");
    setMode("login");
  };

  const switchToRegister = () => {
    setDirection("left");
    setMode("register");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLogin(true);
    setLoginError(null);

    try {
      const response = await fetch(
        "http://taskeraapi.runasp.net/api/Auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Invalid email or password.");
      }

      if (!data.token) throw new Error("No token returned.");

      localStorage.setItem("token", data.token);

      const decoded: JwtPayload = jwtDecode(data.token);
      // console.log(data.token);
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];


      if (role === "Admin") {
        window.location.href = "/admin/";
      } else if (role === "normal") {
        window.location.href = "/user/";
      } else {
        window.location.href = "/";
      }
    } catch (err: any) {
      setLoginError(err.message || "Something went wrong.");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingRegister(true);
    setRegisterError(null);
    setRegisterSuccess(null);

    try {
      if (registerPassword !== confirmPassword) {
        setRegisterError("Passwords do not match.");
        setLoadingRegister(false);
        return;
      }
      const response = await fetch(
        "https://taskera.runasp.net/api/Auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            email: registerEmail,
            password: registerPassword,
            confirmPassword,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data?.message || "Registration failed.");

      setRegisterSuccess("Account created! Please check your email.");
      setFullName("");
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (err: any) {
      setRegisterError(err.message);
    } finally {
      setLoadingRegister(false);
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
      <div className="flex justify-start items-center bg-cream-white w-[55%] mx-auto my-auto relative overflow-hidden">
        <div className="w-2/3 max-w-md p-10 mr-16">
          <h1 className="text-3xl font-heading text-primaryPurple text-center mb-2">
            {mode === "login" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-center text-neutralBlack font-subtitle opacity-80 mb-6">
            {mode === "login"
              ? "Welcome back! Please log in to your account."
              : "Create your account to get started."}
          </p>

          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.form
                key="login"
                onSubmit={handleLogin}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 font-body"
              >
                {loginError && (
                  <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm text-center">
                    {loginError}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="INemail"
                    className="block mb-1 text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="INemail"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentTeal text-neutralBlack hover:shadow-soft-orange hover:shadow-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="INpassword"
                    className="block mb-1 text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="INpassword"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentTeal text-neutralBlack hover:shadow-soft-orange hover:shadow-md"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loadingLogin}
                  className="w-full bg-primaryPurple hover:bg-bright-magenta text-black font-semibold py-3 rounded-lg transition hover:shadow-md hover:shadow-primary-purple"
                >
                  {loadingLogin ? "Logging in..." : "Sign In"}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                onSubmit={handleRegister}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 font-body"
              >
                {registerError && (
                  <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm text-center">
                    {registerError}
                  </div>
                )}
                {registerSuccess && (
                  <div className="bg-green-100 text-green-600 px-4 py-2 rounded-lg text-sm text-center">
                    {registerSuccess}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="fullname"
                    className="block mb-1 text-sm font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentTeal text-neutralBlack hover:shadow-soft-orange hover:shadow-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="UPemail"
                    className="block mb-1 text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="UPemail"
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentTeal text-neutralBlack hover:shadow-soft-orange hover:shadow-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="UPpassword"
                    className="block mb-1 text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="UPpassword"
                    type="password"
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentTeal text-neutralBlack hover:shadow-soft-orange hover:shadow-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm password"
                    className="block mb-1 text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentTeal text-neutralBlack hover:shadow-soft-orange hover:shadow-md"
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
                    value={role}
                    onChange={(e) => setRole(Number(e.target.value))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentTeal text-neutralBlack"
                  >
                    <option value={0}>Client</option>
                    <option value={1}>Freelancer</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loadingRegister}
                  className="w-full bg-primaryPurple hover:bg-bright-magenta hover:shadow-md hover:shadow-primary-purple text-black font-semibold py-3 rounded-lg transition"
                >
                  {loadingRegister ? "Creating account..." : "Sign Up"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="my-6 flex items-center text-sm text-neutralBlack opacity-70">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-3 font-body hover:bg-warm-yellow transition">
              <FcGoogle size={20} />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-3 font-body hover:bg-warm-yellow transition">
              <FaGithub size={20} />
              Continue with GitHub
            </button>
          </div>

          <p className="text-sm text-center mt-6 font-subtitle">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={switchToRegister}
                  className="text-primaryPurple font-bold hover:underline hover:text-shadow-md hover:text-shadow-primary-purple"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={switchToLogin}
                  className="text-primaryPurple font-bold hover:underline hover:text-shadow-md hover:text-shadow-primary-purple"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{
              x: direction === "right" ? 0 : -500,
              opacity: 1,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: direction === "right" ? 500 : -500,
              opacity: 0,
            }}
            transition={{ duration: 0.5 }}
            className="bg-soft-orange pl-96 rounded-l-full absolute inset-y-0 right-0 z-0"
          />
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default OAuthPage;
