export default function ProgressBar({

  value

}: {

  value: number;

}) {

  const safeValue = Math.min(value, 100);

  return (

    <div className="mt-4 h-5 w-full overflow-hidden rounded-full bg-gray-200">

      <div
        className="h-full rounded-full bg-green-500 transition-all duration-700"
        style={{
          width: `${safeValue}%`
        }}
      />

    </div>
  );
}