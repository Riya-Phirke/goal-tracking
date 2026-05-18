"use client";

import { useState } from "react";

import api from "@/lib/api";

export default function AchievementForm({
  goalId
}: {
  goalId: number;
}) {

  const [currentValue, setCurrentValue] =
    useState("");

  const [quarter, setQuarter] =
    useState("Q1");

  const updateProgress = async () => {

    try {

      await api.put(
        `/goals/update-progress/${goalId}`,
        {
          current_value: Number(currentValue),

          quarter,

          changed_by: Number(
            localStorage.getItem("user_id")
          )
        }
      );

      alert("Progress updated");

      window.location.reload();

    } catch (error: any) {

      alert(error.response.data.detail);
    }
  };

  return (

    <div className="mt-6 rounded-2xl border p-6">

      <div className="grid gap-4">

        <select
          value={quarter}
          onChange={(e) =>
            setQuarter(e.target.value)
          }
          className="rounded-2xl border p-4"
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

        <input
          type="number"
          placeholder="Achievement Value"
          value={currentValue}
          onChange={(e) =>
            setCurrentValue(
              e.target.value
            )
          }
          className="rounded-2xl border p-4"
        />

        <button
          onClick={updateProgress}
          className="rounded-2xl bg-green-600 px-6 py-3 text-white"
        >

          Update Progress

        </button>

      </div>

    </div>
  );
}