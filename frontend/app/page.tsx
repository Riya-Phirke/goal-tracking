import Link from "next/link";

import {
  Brain,
  BarChart3,
  ShieldCheck,
  Target,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function HomePage() {

  const features = [
    {
      icon: Brain,
      title: "AI Performance Insights",
      description:
        "Generate intelligent employee summaries, risk analysis, and productivity insights automatically."
    },
    {
      icon: Target,
      title: "Goal Management",
      description:
        "Create, track, submit, approve, and manage enterprise goals seamlessly."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Visual dashboards, reports, charts, and business intelligence monitoring."
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Security",
      description:
        "Role-based authentication, audit logs, workflow approvals, and access control."
    }
  ];

  return (

    <div className="min-h-screen bg-[#f8fafc] text-gray-900">

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-blue-600 p-3 text-white shadow-lg">
              <Target size={26} />
            </div>

            <div>

              <h1 className="text-2xl font-bold">
                PerformanceTracker
              </h1>

              <p className="text-sm text-gray-500">
                Enterprise Performance Platform
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Link
              href="/login"
              className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white shadow-lg transition hover:bg-blue-700"
            >
              Get Started
            </Link>

          </div>

        </div>

      </header>

      {/* HERO SECTION */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-purple-100 opacity-70" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-8 py-28 text-center">

          <div className="mb-6 rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-700 shadow-sm">
            AI-Powered Enterprise Productivity Suite
          </div>

          <h1 className="max-w-5xl text-6xl font-extrabold leading-[1.15] tracking-tight">

            Smart Goal Tracking
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}with AI Insights
            </span>

          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-10 text-gray-600">

            Streamline employee performance management,
            manager approvals, analytics, achievements,
            and AI-powered insights using a modern enterprise platform.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition hover:scale-105 hover:bg-blue-700"
            >
              Start Free
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-gray-300 bg-white px-8 py-4 text-lg font-semibold shadow-sm transition hover:bg-gray-100"
            >
              Login
            </Link>

          </div>

          {/* STATS */}

          <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="text-5xl font-bold text-blue-600">
                95%
              </h2>
              <p className="mt-3 text-gray-600">
                Productivity Improvement
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="text-5xl font-bold text-purple-600">
                AI
              </h2>
              <p className="mt-3 text-gray-600">
                Smart Risk Detection
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="text-5xl font-bold text-green-600">
                24/7
              </h2>
              <p className="mt-3 text-gray-600">
                Real-Time Analytics
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="mx-auto max-w-7xl px-8 py-24">

        <div className="mb-16 text-center">

          <h2 className="text-5xl font-bold">
            Powerful Enterprise Features
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-gray-600">
            Everything needed to manage enterprise productivity,
            employee performance, approvals, and analytics.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                key={index}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
              >

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
                  <Icon size={30} />
                </div>

                <h3 className="text-3xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-5 text-lg leading-9 text-gray-600">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </section>

      {/* BENEFITS */}

      <section className="bg-white py-24">

        <div className="mx-auto max-w-6xl px-8">

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">

            <div>

              <h2 className="text-5xl font-bold leading-tight">
                Designed for Modern Enterprises
              </h2>

              <p className="mt-8 text-lg leading-9 text-gray-600">
                GoalSync AI simplifies enterprise productivity management with intelligent workflows, AI-driven recommendations, and executive analytics.
              </p>

            </div>

            <div className="space-y-6">

              {[
                "AI-generated performance summaries",
                "Role-based enterprise dashboards",
                "Manager approval workflows",
                "Audit logs and analytics",
                "Interactive charts and exports"
              ].map((item, index) => (

                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl bg-gray-50 p-5"
                >

                  <CheckCircle2
                    className="text-green-600"
                    size={28}
                  />

                  <p className="text-lg font-medium">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="px-8 py-24">

        <div className="mx-auto max-w-5xl rounded-[40px] bg-gradient-to-r from-blue-600 to-purple-600 p-16 text-center text-white shadow-2xl">

          <h2 className="text-5xl font-bold leading-tight">
            Ready to Transform Enterprise Productivity?
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-blue-100">
            Start managing employee goals, approvals, analytics, and AI insights through one powerful platform.
          </p>

          <div className="mt-12 flex justify-center gap-5">

            <Link
              href="/signup"
              className="rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-700 transition hover:scale-105"
            >
              Create Account
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-white px-8 py-4 text-lg font-bold transition hover:bg-white hover:text-blue-700"
            >
              Login
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}
