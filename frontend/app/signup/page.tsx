"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/api";

export default function SignupPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    department: ""
  });

  const handleSignup = async () => {

    try {

      await api.post("/register", formData);

      alert("Account created successfully");

      router.push("/login");

    } catch (error: any) {

      alert(error.response?.data?.detail || "Signup failed");
    }
  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-8">

      <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[40px] bg-white shadow-2xl lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="hidden bg-gradient-to-br from-blue-600 to-purple-700 p-16 text-white lg:flex lg:flex-col lg:justify-center">

          <h1 className="text-5xl font-bold leading-tight">
            Join PerformanceTracker
          </h1>

          <p className="mt-8 text-xl leading-10 text-blue-100">
            Experience enterprise-grade goal management, AI insights, analytics, approvals, and productivity tracking.
          </p>

          <div className="mt-12 space-y-6">

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              AI-powered employee insights
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              Real-time analytics dashboards
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              Enterprise approval workflows
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-10 lg:p-16">

          <div className="mb-10">

            <h2 className="text-4xl font-bold">
              Create Account
            </h2>

            <p className="mt-3 text-gray-500">
              Start managing goals intelligently.
            </p>

          </div>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-blue-600"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-blue-600"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-blue-600"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value
                })
              }
            />

            <select
              className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-blue-600"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value
                })
              }
            >

              <option value="employee">
                Employee
              </option>

              <option value="manager">
                Manager
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

            <input
              type="text"
              placeholder="Department"
              className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-blue-600"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department: e.target.value
                })
              }
            />

            <button
              onClick={handleSignup}
              className="w-full rounded-2xl bg-blue-600 p-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700"
            >
              Create Account
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
