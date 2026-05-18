"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ManagerComment({
  goalId
}: {
  goalId: number
}) {

  const [comment, setComment] = useState("");

  const submitComment = async () => {

    try {

      await api.post("/manager/comments", {
        goal_id: goalId,
        manager_id: 2,
        quarter: "Q1",
        comment
      });

      alert("Comment added");

      setComment("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4">

      <textarea
        placeholder="Manager Comment"
        className="w-full rounded border p-2"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />

      <button
        onClick={submitComment}
        className="mt-2 rounded bg-blue-600 px-4 py-2 text-white"
      >
        Add Comment
      </button>

    </div>
  );
}