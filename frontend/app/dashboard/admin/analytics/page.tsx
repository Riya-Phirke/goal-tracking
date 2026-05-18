"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";

export default function AnalyticsPage() {

  return (

    <AuthGuard>

      <div className="flex">

        <Sidebar />

        <div className="min-h-screen flex-1 bg-gray-50">

          <div className="p-8">

            <Navbar />

            <h1 className="text-4xl font-bold">
              System Analytics
            </h1>

            <p className="mt-4 text-lg text-gray-600">

              Advanced enterprise analytics
              and reporting dashboard.

            </p>

          </div>

        </div>

      </div>

    </AuthGuard>
  );
}