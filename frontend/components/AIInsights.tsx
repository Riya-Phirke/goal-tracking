"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

export default function AIInsights() {

  const [summary, setSummary] = useState("");

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {

    try {

      const response = await api.get(
        "/ai/performance-summary/1"
      );

      setSummary(
        response.data.ai_summary
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="mb-8 rounded-2xl border bg-white p-6 shadow">

      <div className="mb-4 flex items-center gap-3">

        <div className="rounded-full bg-purple-600 px-3 py-1 text-sm text-white">
          AI
        </div>

        <h2 className="text-2xl font-bold">
          AI Performance Insights
        </h2>

      </div>

      <p className="leading-8 text-gray-700">

        {summary}

      </p>

    </div>
  );
}