"use client";

import Link from "next/link";

import {
  usePathname,
  useRouter
} from "next/navigation";

import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Shield,
  LogOut
} from "lucide-react";

export default function Sidebar() {

  const pathname = usePathname();

  const router = useRouter();

  const role =
    typeof window !== "undefined"
      ? localStorage.getItem("role")
      : "";

  const logout = () => {

    localStorage.clear();

    router.push("/login");
  };

  const activeClass = (path: string) => {

    return pathname === path
      ? "bg-blue-600 text-white shadow-lg"
      : "text-gray-300 hover:bg-gray-800";
  };

  return (

    <div className="flex h-screen w-[240px] flex-col bg-[#0f172a] p-5">

      {/* LOGO */}

      <div className="mb-10">

        <h1 className="text-5xl font-extrabold leading-none text-white">

          PerformanceTracker

        </h1>

        <p className="mt-3 text-sm text-gray-400">

          Enterprise Productivity Platform

        </p>

      </div>

      {/* EMPLOYEE SIDEBAR */}

      {role === "employee" && (

        <div className="flex flex-col gap-3">

          <Link
            href="/dashboard/employee"
            className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-lg font-medium transition ${activeClass(
              "/dashboard/employee"
            )}`}
          >

            <LayoutDashboard size={22} />

            Employee Dashboard

          </Link>

          <Link
            href="/dashboard/employee/goals"
            className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-lg font-medium transition ${activeClass(
              "/dashboard/employee/goals"
            )}`}
          >

            <ClipboardList size={22} />

            My Goals

          </Link>

        </div>

      )}

      {/* MANAGER SIDEBAR */}

      {role === "manager" && (

        <div className="flex flex-col gap-3">

          <Link
            href="/dashboard/manager"
            className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-lg font-medium transition ${activeClass(
              "/dashboard/manager"
            )}`}
          >

            <LayoutDashboard size={22} />

            Manager Dashboard

          </Link>

          <Link
            href="/dashboard/manager/team-goals"
            className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-lg font-medium transition ${activeClass(
              "/dashboard/manager/team-goals"
            )}`}
          >

            <Users size={22} />

            Team Goals

          </Link>

        </div>

      )}

      {/* ADMIN SIDEBAR */}

      {role === "admin" && (

        <div className="flex flex-col gap-3">

          <Link
            href="/dashboard/admin"
            className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-lg font-medium transition ${activeClass(
              "/dashboard/admin"
            )}`}
          >

            <LayoutDashboard size={22} />

            Admin Dashboard

          </Link>

          <Link
            href="/dashboard/admin/analytics"
            className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-lg font-medium transition ${activeClass(
              "/dashboard/admin/analytics"
            )}`}
          >

            <Shield size={22} />

            System Analytics

          </Link>

        </div>

      )}

      {/* FOOTER */}

      <div className="mt-auto">

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 p-4 text-lg font-semibold text-white transition hover:bg-red-700"
        >

          <LogOut size={22} />

          Logout

        </button>

      </div>

    </div>
  );
}