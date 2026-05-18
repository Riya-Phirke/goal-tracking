"use client";

import { useState } from "react";

import api from "@/lib/api";

export default function GoalForm() {

  const [thrustArea, setThrustArea] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [uomType, setUomType] =
    useState("Min");

  const [targetValue, setTargetValue] =
    useState("");

  const [weightage, setWeightage] =
    useState("");

  const [deadlineDate, setDeadlineDate] =
    useState("");

  const createGoal = async () => {

    try {

      await api.post(
        "/goals/create",
        {
          employee_id: Number(
            localStorage.getItem("user_id")
          ),

          thrust_area: thrustArea,

          title,

          description,

          uom_type: uomType,

          target_value: Number(targetValue),

          weightage: Number(weightage),

          deadline_date:
            uomType === "Timeline"
              ? deadlineDate
              : null
        }
      );

      alert("Goal created successfully");

      window.location.reload();

    } catch (error: any) {

      alert(error.response.data.detail);
    }
  };

  return (

    <div className="mb-8 rounded-3xl bg-white p-8 shadow">

      <h2 className="mb-6 text-3xl font-bold">

        Create Goal

      </h2>

      <div className="grid gap-4">

        <input
          type="text"
          placeholder="Thrust Area"
          value={thrustArea}
          onChange={(e) =>
            setThrustArea(e.target.value)
          }
          className="rounded-2xl border p-4"
        />

        <input
          type="text"
          placeholder="Goal Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="rounded-2xl border p-4"
        />

        <textarea
          placeholder="Goal Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="rounded-2xl border p-4"
        />

        <select
          value={uomType}
          onChange={(e) =>
            setUomType(e.target.value)
          }
          className="rounded-2xl border p-4"
        >

          <option value="Min">
            Min
          </option>

          <option value="Max">
            Max
          </option>

          <option value="Timeline">
            Timeline
          </option>

          <option value="Zero">
            Zero
          </option>

        </select>

        <input
          type="number"
          placeholder="Target Value"
          value={targetValue}
          onChange={(e) =>
            setTargetValue(e.target.value)
          }
          className="rounded-2xl border p-4"
        />

        <input
          type="number"
          placeholder="Weightage"
          value={weightage}
          onChange={(e) =>
            setWeightage(e.target.value)
          }
          className="rounded-2xl border p-4"
        />

        {/* TIMELINE DEADLINE */}

        {uomType === "Timeline" && (

          <input
            type="date"
            value={deadlineDate}
            onChange={(e) =>
              setDeadlineDate(
                e.target.value
              )
            }
            className="rounded-2xl border p-4"
          />

        )}

        <button
          onClick={createGoal}
          className="rounded-2xl bg-blue-600 px-6 py-3 text-white"
        >

          Create Goal

        </button>

      </div>

    </div>
  );
}