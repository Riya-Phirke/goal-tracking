"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function CompletionDashboard() {

  const [data, setData] = useState<any[]>([]);

  const [quarter, setQuarter] = useState("Q1");

  useEffect(() => {
    fetchCompletion();
  }, [quarter]);

  const fetchCompletion = async () => {

    try {

      const response = await api.get(
        `/completion/quarter/${quarter}`
      );

      setData(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <AuthGuard>

      <div className="flex">

        <Sidebar />

        <div className="min-h-screen flex-1 bg-gray-50">

          <div className="p-8">

            <Navbar />

            <div className="mb-8 flex items-center justify-between">

              <h1 className="text-4xl font-bold">

                Completion Dashboard

              </h1>

              <select
                value={quarter}
                onChange={(e) =>
                  setQuarter(e.target.value)
                }
                className="rounded-2xl border p-3"
              >

                <option value="Q1">
                  Q1
                </option>

                <option value="Q2">
                  Q2
                </option>

                <option value="Q3">
                  Q3
                </option>

                <option value="Q4">
                  Q4
                </option>

              </select>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow">

              <div className="h-[500px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart data={data}>

                    <XAxis
                      dataKey="employee"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="completion_percentage"
                      fill="#2563eb"
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

            <div className="mt-8 grid gap-6">

              {data.map((employee, index) => (

                <div
                  key={index}
                  className="rounded-3xl bg-white p-6 shadow"
                >

                  <h2 className="text-2xl font-bold">

                    {employee.employee}

                  </h2>

                  <p className="mt-2">

                    Completed Check-ins:
                    {" "}
                    {employee.completed_checkins}

                  </p>

                  <p className="mt-2">

                    Completion Percentage:
                    {" "}
                    {employee.completion_percentage.toFixed(0)}
                    %

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </AuthGuard>
  );
}