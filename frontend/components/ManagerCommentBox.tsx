"use client";

import { useState } from "react";

import api from "@/lib/api";

export default function ManagerCommentBox({

  goalId

}: {

  goalId: number;

}) {

  const [comment, setComment] = useState("");

  const saveComment = async () => {

    try {

      await api.post(
        "/manager/add-comment",
        {
          goal_id: goalId,

          manager_id: Number(
            localStorage.getItem("user_id")
          ),

          comment
        }
      );

      alert("Comment added successfully");

      setComment("");

    } catch (error) {

      console.log(error);

      alert("Failed to add comment");
    }
  };

  return (

    <div className="mt-6">

      <textarea
        placeholder="Add manager feedback"
        className="w-full rounded-2xl border p-4"
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
      />

      <button
        onClick={saveComment}
        className="mt-4 rounded-2xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >

        Save Comment

      </button>

    </div>
  );
}