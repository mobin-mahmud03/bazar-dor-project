import { toBn } from "@/lib/bn";

export default function Badge({ c }: { c: number }) {
  const cls = c > 0 ? "bg-red-50 text-red-600" : c < 0 ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-600";
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${cls}`}>
      {c > 0 ? "▲" : c < 0 ? "▼" : "—"} {toBn(Math.abs(c).toFixed(1))}%
    </span>
  );
}