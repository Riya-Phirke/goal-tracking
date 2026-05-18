"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/Loader";
import StatusBadge from "@/components/StatusBadge";
import ManagerCommentBox from "@/components/ManagerCommentBox";

export default function TeamGoalsPage() {

  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {

    try {

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

  const approveGoal = async (
    goalId: number
  ) => {

    try {

      await api.put(
        `/manager/approve/${goalId}`
      );

      alert("Goal approved");

      fetchGoals();

    } catch (error) {

      console.log(error);

      alert("Approval failed");
    }
  };

  const rejectGoal = async (
    goalId: number
  ) => {

    try {

      await api.put(
        `/manager/reject/${goalId}`
      );

      alert("Goal rejected");

      fetchGoals();

    } catch (error) {

      console.log(error);

      alert("Rejection failed");
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
                Team Goals
              </h1>

              <p className="mt-2 text-gray-500">

                Monitor and review employee goals.

              </p>

            </div>

            <div className="grid gap-6">

              {goals.map((goal) => (

                <div
                  key={goal.id}
                  className="rounded-3xl bg-white p-8 shadow"
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <h2 className="text-3xl font-bold">

                        {goal.title}

                      </h2>

                      <p className="mt-3 text-gray-600">

                        {goal.description}

                      </p>

                      <div className="mt-5 space-y-2">

                        <p>

                          Target:
                          {" "}
                          {goal.target_value}
                          {" "}
                          {goal.uom_type}

                        </p>

                        <p>

                          Current Progress:
                          {" "}
                          {goal.current_value}
                          {" "}
                          {goal.uom_type}

                        </p>

                        <p>

                          Progress Status:
                          {" "}
                          {goal.progress_status}

                        </p>

                      </div>

                    </div>

                    <StatusBadge
                      status={goal.status}
                    />

                  </div>

                  {/* ACTION BUTTONS */}

                  <div className="mt-6 flex gap-4">

                    <button
                      onClick={() =>
                        approveGoal(goal.id)
                      }
                      className="rounded-2xl bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
                    >

                      Approve

                    </button>

                    <button
                      onClick={() =>
                        rejectGoal(goal.id)
                      }
                      className="rounded-2xl bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
                    >

                      Reject

                    </button>

                  </div>

                  {/* COMMENT BOX */}

                  <ManagerCommentBox
                    goalId={goal.id}
                  />

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </AuthGuard>
  );
}