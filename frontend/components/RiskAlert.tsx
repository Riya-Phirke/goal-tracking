export default function RiskAlert({
  progress
}: {
  progress: number
}) {

  if (progress >= 80) {

    return (

      <div className="mb-6 rounded-xl bg-green-100 p-4 text-green-800">

        Excellent progress detected.

      </div>
    );
  }

  if (progress >= 50) {

    return (

      <div className="mb-6 rounded-xl bg-yellow-100 p-4 text-yellow-800">

        Moderate performance risk detected.

      </div>
    );
  }

  return (

    <div className="mb-6 rounded-xl bg-red-100 p-4 text-red-800">

      High performance risk detected.
      Manager intervention recommended.

    </div>
  );
}