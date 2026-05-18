"use client";

import { Bell } from "lucide-react";

export default function Navbar() {

  return (

    <div className="mb-8 flex items-center justify-between rounded-3xl border border-gray-200 bg-white px-8 py-4 shadow-sm">

      <div>

        <h1 className="text-2xl font-bold text-gray-900">

          PerformanceTracker Dashboard

        </h1>

        <p className="mt-2 text-gray-500">

          Enterprise Performance Management System

        </p>

      </div>

      <div className="flex items-center gap-5">

        <button className="rounded-2xl bg-gray-100 p-4 transition hover:bg-gray-200">

          <Bell size={22} />

        </button>

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xl font-bold text-white shadow-lg">

          G

        </div>

      </div>

    </div>
  );
}