"use client";

export default function ProfileCard() {

  const role =
    typeof window !== "undefined"
      ? localStorage.getItem("role")
      : "";

  const roleText = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "";

  return (

    <div className="mb-8 rounded-[28px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="mb-3 text-xs uppercase tracking-[4px] text-blue-100">

            Enterprise Productivity Platform

          </p>

          <h1 className="text-4xl font-bold">

            Welcome Back 👋

          </h1>

          <p className="mt-4 max-w-2xl text-base leading-8 text-blue-100">

            Track goals, monitor achievements,
            analyze performance insights,
            and improve productivity efficiently.

          </p>

        </div>

        {/* ROLE BADGE */}

        <div className="rounded-2xl bg-white/10 px-6 py-5 backdrop-blur-md">

          <p className="text-xs uppercase tracking-[3px] text-blue-100">

            Access

          </p>

          <h2 className="mt-2 text-2xl font-bold">

            {roleText}

          </h2>

        </div>

      </div>

    </div>
  );
}