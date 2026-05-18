"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";

import GoalForm from "@/components/GoalForm";
import AchievementForm from "@/components/AchievementForm";
import EditGoalModal from "@/components/EditGoalModal";
import CommentsList from "@/components/CommentsList";

export default function EmployeeDashboard() {

  const [goals, setGoals] = useState<any[]>([]);

  const userId =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("user_id"))
      : null;

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {

    try {

      const response = await api.get(
        "/goals"
      );

      const employeeGoals =
        response.data.filter(
          (goal: any) =>
            goal.employee_id === userId
        );

      setGoals(employeeGoals);

    } catch (error) {

      console.log(error);
    }
  };

  const deleteGoal = async (
    goalId: number
  ) => {

    try {

      await api.delete(
        `/goals/delete/${goalId}`
      );

      alert("Goal deleted");

      fetchGoals();

    } catch (error) {

      console.log(error);

      alert("Delete failed");
    }
  };

  const submitGoals = async () => {

    try {

      await api.put(
        `/goals/submit/${userId}`
      );

      alert(
        "Goals submitted for approval"
      );

      fetchGoals();

    } catch (error: any) {

      alert(error.response.data.detail);
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

              <div>

                <h1 className="text-4xl font-bold">

                  Employee Dashboard

                </h1>

                <p className="mt-2 text-gray-600">

                  Manage your goals,
                  achievements and
                  quarterly progress

                </p>

              </div>

              <button
                onClick={submitGoals}
                className="rounded-2xl bg-blue-600 px-6 py-3 text-white shadow-lg"
              >

                Submit Goals

              </button>

            </div>

            {/* CREATE GOAL */}

            <GoalForm />

            {/* GOALS LIST */}

            <div className="grid gap-8">

              {goals.map((goal) => {

                const progress =
                  goal.target_value > 0
                    ? Math.min(
                        (
                          goal.current_value /
                          goal.target_value
                        ) * 100,
                        100
                      )
                    : 0;

                return (

                  <div
                    key={goal.id}
                    className="rounded-3xl bg-white p-8 shadow"
                  >

                    {/* TOP SECTION */}

                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                      <div>

                        <div className="flex items-center gap-3">

                          <h2 className="text-3xl font-bold">

                            {goal.title}

                          </h2>

                          {goal.shared && (

                            <span className="rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-700">

                              Shared Goal

                            </span>

                          )}

                        </div>

                        <p className="mt-3 text-gray-600">

                          {goal.description}

                        </p>

                      </div>

                      <div className="rounded-2xl bg-gray-100 px-4 py-2 text-sm font-semibold">

                        {goal.status}

                      </div>

                    </div>

                    {/* DETAILS */}

                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">

                      <div className="rounded-2xl bg-gray-50 p-5">

                        <p className="text-sm text-gray-500">

                          Thrust Area

                        </p>

                        <p className="mt-2 text-xl font-bold">

                          {goal.thrust_area}

                        </p>

                      </div>

                      <div className="rounded-2xl bg-gray-50 p-5">

                        <p className="text-sm text-gray-500">

                          UOM Type

                        </p>

                        <p className="mt-2 text-xl font-bold">

                          {goal.uom_type}

                        </p>

                      </div>

                      <div className="rounded-2xl bg-gray-50 p-5">

                        <p className="text-sm text-gray-500">

                          Weightage

                        </p>

                        <p className="mt-2 text-xl font-bold">

                          {goal.weightage}%

                        </p>

                      </div>

                    </div>

                    {/* TARGETS */}

                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

                      <div className="rounded-2xl bg-blue-50 p-6">

                        <p className="text-sm text-gray-600">

                          Target Value

                        </p>

                        <p className="mt-3 text-4xl font-bold text-blue-700">

                          {goal.target_value}

                        </p>

                      </div>

                      <div className="rounded-2xl bg-green-50 p-6">

                        <p className="text-sm text-gray-600">

                          Current Achievement

                        </p>

                        <p className="mt-3 text-4xl font-bold text-green-700">

                          {goal.current_value}

                        </p>

                      </div>

                    </div>

                    {/* TIMELINE DEADLINE */}

                    {goal.uom_type ===
                      "Timeline" && (

                      <div className="mt-6 rounded-2xl bg-orange-50 p-5">

                        <p className="text-lg font-semibold text-orange-700">

                          Deadline:
                          {" "}
                          {
                            new Date(
                              goal.deadline_date
                            ).toLocaleDateString()
                          }

                        </p>

                      </div>

                    )}

                    {/* STATUS */}

                    <div className="mt-8">

                      <div className="mb-3 flex items-center justify-between">

                        <p className="font-semibold">

                          Progress

                        </p>

                        <p className="font-bold">

                          {progress.toFixed(0)}%

                        </p>

                      </div>

                      <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">

                        <div
                          className="h-full rounded-full bg-blue-600 transition-all"
                          style={{
                            width: `${progress}%`
                          }}
                        />

                      </div>

                    </div>

                    {/* STATUS LABEL */}

                    <div className="mt-6 flex flex-wrap gap-3">

                      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                        {goal.progress_status}

                      </span>

                      {goal.uom_type ===
                        "Timeline" && (

                        <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">

                          Timeline Goal Tracking
                          Enabled

                        </span>

                      )}

                    </div>

                    {/* ACHIEVEMENT UPDATE */}

                    <AchievementForm
                      goalId={goal.id}
                    />

                    {/* MANAGER COMMENTS */}

                    <CommentsList
                      goalId={goal.id}
                    />

                    {/* EDIT GOAL */}

                    {!goal.is_locked && (

                      <EditGoalModal
                        goal={goal}
                        refresh={fetchGoals}
                      />

                    )}

                    {/* ACTIONS */}

                    <div className="mt-8 flex flex-wrap gap-4">

                      {!goal.is_locked && (

                        <button
                          onClick={() =>
                            deleteGoal(goal.id)
                          }
                          className="rounded-2xl bg-red-600 px-6 py-3 text-white"
                        >

                          Delete Goal

                        </button>

                      )}

                    </div>

                  </div>

                );
              })}

            </div>

          </div>

        </div>

      </div>

    </AuthGuard>
  );
}