"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import StatusBadge from "@/components/StatusBadge";
import ManagerComment from "@/components/ManagerComment";
import Loader from "@/components/Loader";

export default function ManagerDashboard() {

  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingGoals();
  }, []);

  const fetchPendingGoals = async () => {

    try {

      setLoading(true);

      const response = await api.get(
        "/manager/pending-goals"
      );

      setGoals(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  const approveGoal = async (id: number) => {

    try {

      await api.put(
        `/manager/approve-goal/${id}`
      );

      alert("Goal approved");

      fetchPendingGoals();

    } catch (error) {
      console.log(error);
    }
  };

  const rejectGoal = async (id: number) => {

    try {

      await api.put(
        `/manager/rework-goal/${id}`
      );

      alert("Goal sent for rework");

      fetchPendingGoals();

    } catch (error) {
      console.log(error);
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

            <ProfileCard />

            <h1 className="mb-8 text-4xl font-bold">
              Manager Dashboard
            </h1>

            <div className="grid gap-6">

              {goals.map((goal) => (

                <div
                  key={goal.id}
                  className="rounded-2xl bg-white p-6 shadow"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h2 className="text-2xl font-semibold">
                        {goal.title}
                      </h2>

                      <p className="mt-2 text-gray-600">
                        {goal.description}
                      </p>

                      <p className="mt-2">
                        Weightage: {goal.weightage}%
                      </p>

                      <div className="mt-3">
                        <StatusBadge status={goal.status} />
                      </div>

                    </div>

                    <div className="flex gap-4">

                      <button
                        onClick={() => approveGoal(goal.id)}
                        className="rounded bg-green-600 px-4 py-2 text-white"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectGoal(goal.id)}
                        className="rounded bg-red-600 px-4 py-2 text-white"
                      >
                        Reject
                      </button>

                    </div>

                  </div>

                  <ManagerComment goalId={goal.id} />

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </AuthGuard>
  );
}