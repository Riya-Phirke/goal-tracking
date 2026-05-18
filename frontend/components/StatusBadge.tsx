export default function StatusBadge({
  status
}: {
  status: string
}) {

  let color = "bg-gray-500";

  if (status === "approved") {
    color = "bg-green-600";
  }

  if (status === "pending_approval") {
    color = "bg-yellow-500";
  }

  if (status === "rework") {
    color = "bg-red-600";
  }

  return (
    <span
      className={`${color} rounded px-3 py-1 text-white`}
    >
      {status}
    </span>
  );
}