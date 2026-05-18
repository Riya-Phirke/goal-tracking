"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/Loader";
import StatusBadge from "@/components/StatusBadge";

export default function MyGoalsPage() {

  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {

    try {

      const response = await api.get("/goals");

      setGoals(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (

    <AuthGuard>

      <div className="flex">

        <Sidebar />

        <div className="min-h-screen flex-1 bg-gray-50">

          <div className="p-8">

            <Navbar />

            <div className="mb-8">

              <h1 className="text-4xl font-bold">
                My Goals
              </h1>

              <p className="mt-2 text-gray-500">

                View and monitor all assigned goals.

              </p>

            </div>

            <div className="grid gap-6">

              {goals.map((goal) => (

                <div
                  key={goal.id}
                  className="rounded-3xl bg-white p-6 shadow"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h2 className="text-2xl font-bold">
                        {goal.title}
                      </h2>

                      <p className="mt-3 text-gray-600">
                        {goal.description}
                      </p>

                      <p className="mt-4">
                        Weightage: {goal.weightage}%
                      </p>

                    </div>

                    <StatusBadge status={goal.status} />

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </AuthGuard>
  );
}