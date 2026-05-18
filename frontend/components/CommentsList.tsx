"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

export default function CommentsList({
  goalId
}: {
  goalId: number;
}) {

  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {

    try {

      const response = await api.get(
        `/manager/comments/${goalId}`
      );

      setComments(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="mt-6 rounded-2xl bg-gray-50 p-5">

      <h3 className="mb-4 text-lg font-bold">

        Manager Feedback

      </h3>

      <div className="space-y-3">

        {comments.map((comment) => (

          <div
            key={comment.id}
            className="rounded-xl bg-white p-4 shadow"
          >

            {comment.comment}

          </div>

        ))}

      </div>

    </div>
  );
}