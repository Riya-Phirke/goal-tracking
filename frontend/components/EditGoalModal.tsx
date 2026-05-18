"use client";

import { useState } from "react";

import api from "@/lib/api";

export default function EditGoalModal({
  goal,
  refresh
}: {
  goal: any;
  refresh: () => void;
}) {

  const [title, setTitle] = useState(goal.title);

  const [description, setDescription] = useState(
    goal.description
  );

  const [targetValue, setTargetValue] = useState(
    goal.target_value
  );

  const [weightage, setWeightage] = useState(
    goal.weightage
  );

  const updateGoal = async () => {

    try {

      await api.put(
        `/goals/edit/${goal.id}`,
        {
          title,
          description,
          target_value: targetValue,
          weightage
        }
      );

      alert("Goal updated successfully");

      refresh();

    } catch (error) {

      console.log(error);

      alert("Update failed");
    }
  };

  return (

    <div className="mt-6 rounded-2xl border p-6">

      <div className="grid gap-4">

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="rounded-xl border p-4"
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="rounded-xl border p-4"
        />

        <input
          type="number"
          value={targetValue}
          onChange={(e) =>
            setTargetValue(Number(e.target.value))
          }
          className="rounded-xl border p-4"
        />

        <input
          type="number"
          value={weightage}
          onChange={(e) =>
            setWeightage(Number(e.target.value))
          }
          className="rounded-xl border p-4"
        />

        <button
          onClick={updateGoal}
          className="rounded-2xl bg-blue-600 px-6 py-3 text-white"
        >

          Save Changes

        </button>

      </div>

    </div>
  );
}