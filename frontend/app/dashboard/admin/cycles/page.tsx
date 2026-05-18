"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";

export default function CyclePage() {

  const [cycles, setCycles] = useState<any[]>([]);

  const [phase, setPhase] = useState("");

  const [month, setMonth] = useState("");

  useEffect(() => {
    fetchCycles();
  }, []);

  const fetchCycles = async () => {

    try {

      const response = await api.get(
        "/cycles"
      );

      setCycles(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const createCycle = async () => {

    try {

      await api.post(
        "/cycles/create",
        {
          phase,
          open_month: Number(month)
        }
      );

      alert("Cycle created");

      fetchCycles();

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

            <h1 className="mb-8 text-4xl font-bold">

              Cycle Management

            </h1>

            <div className="mb-8 rounded-3xl bg-white p-8 shadow">

              <div className="grid gap-4">

                <input
                  type="text"
                  placeholder="Phase Name"
                  value={phase}
                  onChange={(e) =>
                    setPhase(e.target.value)
                  }
                  className="rounded-2xl border p-4"
                />

                <input
                  type="number"
                  placeholder="Open Month"
                  value={month}
                  onChange={(e) =>
                    setMonth(e.target.value)
                  }
                  className="rounded-2xl border p-4"
                />

                <button
                  onClick={createCycle}
                  className="rounded-2xl bg-blue-600 px-6 py-3 text-white"
                >

                  Create Cycle

                </button>

              </div>

            </div>

            <div className="grid gap-6">

              {cycles.map((cycle) => (

                <div
                  key={cycle.id}
                  className="rounded-3xl bg-white p-6 shadow"
                >

                  <h2 className="text-2xl font-bold">

                    {cycle.phase}

                  </h2>

                  <p className="mt-3 text-gray-600">

                    Open Month:
                    {" "}
                    {cycle.open_month}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </AuthGuard>
  );
}