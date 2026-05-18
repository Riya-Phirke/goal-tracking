"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

export default function AdminDashboard() {

  const [analytics, setAnalytics] = useState<any>({});

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    try {

      const response = await api.get(
        "/admin/analytics"
      );

      setAnalytics(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const chartData = [
    {
      name: "Approved",
      value: analytics.approved_goals || 0
    },
    {
      name: "Completed",
      value: analytics.completed_goals || 0
    }
  ];

  return (

    <AuthGuard>

      <div className="flex">

        <Sidebar />

        <div className="min-h-screen flex-1 bg-gray-50">

          <div className="p-8">

            <Navbar />

            <h1 className="mb-8 text-4xl font-bold">

              Admin Dashboard

            </h1>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">

              <div className="rounded-3xl bg-white p-6 shadow">
                <h2>Total Users</h2>
                <p className="mt-4 text-5xl font-bold">
                  {analytics.total_users}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow">
                <h2>Total Goals</h2>
                <p className="mt-4 text-5xl font-bold">
                  {analytics.total_goals}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow">
                <h2>Approved Goals</h2>
                <p className="mt-4 text-5xl font-bold text-green-600">
                  {analytics.approved_goals}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow">
                <h2>Completed Goals</h2>
                <p className="mt-4 text-5xl font-bold text-blue-600">
                  {analytics.completed_goals}
                </p>
              </div>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow">

              <h2 className="mb-6 text-2xl font-bold">
                Goal Analytics
              </h2>

              <div className="h-[400px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={chartData}
                      dataKey="value"
                      outerRadius={140}
                      label
                    >

                      <Cell fill="#2563eb" />
                      <Cell fill="#16a34a" />

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

              <button
                onClick={() => {
                  window.open(
                    "http://127.0.0.1:8000/admin/export-goals"
                  );
                }}
                className="mt-8 rounded-2xl bg-blue-600 px-6 py-3 text-white"
              >

                Export Excel Report

              </button>

            </div>

          </div>

        </div>

      </div>

    </AuthGuard>
  );
}