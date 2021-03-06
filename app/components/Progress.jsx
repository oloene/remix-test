export default function Progress({ startPercentage = 0 }) {
  const start =
    startPercentage > 100
      ? 100
      : startPercentage < 0
      ? 0
      : Math.round(startPercentage);
  const end = 100 - startPercentage;

  return (
    <div className="flex h-4 w-full">
      <div
        style={{
          width: start + "%",
        }}
        className={`bg-yellow-500 ${
          start >= 100 ? "rounded-full" : "rounded-l-full"
        }`}
      />
      <div
        style={{
          width: end + "%",
        }}
        className={`bg-green-500 ${
          end >= 100 ? "rounded-full" : "rounded-r-full"
        }`}
      />
    </div>
  );
}
