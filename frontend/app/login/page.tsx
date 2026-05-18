"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import api from "@/lib/api";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await api.post(
        "/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user_id",
        response.data.user_id
      );

      if (response.data.role === "employee") {

        router.push("/dashboard/employee");
      }

      else if (
        response.data.role === "manager"
      ) {

        router.push("/dashboard/manager");
      }

      else {

        router.push("/dashboard/admin");
      }

    } catch (error: any) {

      alert(
        error.response?.data?.detail ||
        "Login failed"
      );
    }
  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-8">

      <div className="grid w-full max-w-6xl overflow-hidden rounded-[40px] bg-white shadow-2xl lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="hidden bg-gradient-to-br from-blue-600 to-purple-700 p-16 text-white lg:flex lg:flex-col lg:justify-center">

          <h1 className="text-6xl font-extrabold leading-tight">

            PerformanceTracker

          </h1>

          <p className="mt-8 text-xl leading-10 text-blue-100">

            AI-powered enterprise productivity
            management platform for goal tracking,
            approvals, analytics, and insights.

          </p>

          <div className="mt-12 space-y-5">

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">

              Smart AI Insights

            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">

              Enterprise Approval Workflows

            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">

              Analytics & Productivity Tracking

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-10 lg:p-16">

          <div className="mb-10">

            <h2 className="text-5xl font-bold">

              Welcome Back

            </h2>

            <p className="mt-4 text-lg text-gray-500">

              Login to continue managing productivity.

            </p>

          </div>

          <div className="space-y-6">

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-2xl border border-gray-300 p-5 text-lg outline-none transition focus:border-blue-600"
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-gray-300 p-5 text-lg outline-none transition focus:border-blue-600"
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              onClick={handleLogin}
              className="w-full rounded-2xl bg-blue-600 p-5 text-lg font-semibold text-white shadow-xl transition hover:bg-blue-700"
            >

              Login

            </button>

          </div>

          <p className="mt-8 text-center text-gray-500">

            Don’t have an account?

            <Link
              href="/signup"
              className="ml-2 font-semibold text-blue-600"
            >

              Signup

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}