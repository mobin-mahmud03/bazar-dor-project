import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { toBn } from "@/lib/bn";
import Badge from "@/Component/Badge";
import Emoji from "@/Component/Emoji";

const num = (v: number) => toBn(v.toLocaleString("en-US"));
const avgFmt = (v: number) => toBn(Number.isInteger(v) ? v.toLocaleString("en-US") : v.toFixed(2));

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();

  const rows = p.markets.map((m) => ({ ...m, avg: (m.min + m.max) / 2 })).sort((a, b) => a.avg - b.avg);
  const min = rows.length ? Math.min(...rows.map((r) => r.min)) : p.price;
  const max = rows.length ? Math.max(...rows.map((r) => r.max)) : p.price;
  const avg = rows.length ? Math.round(rows.reduce((s, r) => s + r.avg, 0) / rows.length) : p.price;

  const diff = p.price - p.yesterday;
  const unit = p.unit.replace("প্রতি ", "");
  const box = "bg-base-100 border border-base-300 rounded-2xl";

  const stat = (label: string, value: number, color: string, note: string) => (
    <div className="border border-base-300 rounded-xl p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{num(value)} <span className="text-sm font-medium">টাকা</span></p>
      <p className="text-xs text-gray-500 mt-1">{note}</p>
    </div>
  );

  return (
    <div className="space-y-5">
      <nav className="text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:underline">হোম</Link> ›
        <Link href={`/category/${p.category}`} className="hover:underline">{p.categoryName}</Link> ›
        <span className="text-gray-800">{p.name}</span>
      </nav>

      <section className={`${box} p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-base-200 flex items-center justify-center"><Emoji e={p.emoji} size={48} /></div>
          <div>
            <h1 className="text-2xl font-bold">{p.name}</h1>
            <p className="text-sm text-gray-500">{p.unit} · {p.categoryName}</p>
            <p className="text-sm mt-1">
              গতকালের তুলনায় আজ দাম{" "}
              <b>{diff > 0 ? "বেড়েছে" : diff < 0 ? "কমেছে" : "অপরিবর্তিত"}</b>
              {diff !== 0 && <> - {num(Math.abs(diff))} টাকা</>}
            </p>
          </div>
        </div>
        <div className="bg-base-200 rounded-2xl px-6 py-3 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold">{num(p.price)}</p>
          <p className="text-xs text-gray-500">টাকা / {unit}</p>
          <div className="mt-1"><Badge c={p.change} /></div>
        </div>
      </section>

      <section className={`${box} p-5`}>
        <h2 className="font-bold mb-3">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stat("সর্বনিম্ন দাম", min, "text-green-600", "সবচেয়ে কম দামের বাজার")}
          {stat("সর্বোচ্চ দাম", max, "text-red-600", "সবচেয়ে বেশি দামের বাজার")}
          {stat("গড় দাম", avg, "text-green-600", `${p.unit}-এর হিসাবে`)}
        </div>

        <h2 className="font-bold mt-6 mb-3">বাজারভিত্তিক আজকের দাম</h2>
        {rows.length ? (
          <div className="overflow-x-auto border border-base-300 rounded-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-left">
                  <th className="p-3 font-medium">বাজার</th>
                  <th className="p-3 font-medium">বিভাগ</th>
                  <th className="p-3 font-medium text-right">সর্বনিম্ন</th>
                  <th className="p-3 font-medium text-right">সর্বোচ্চ</th>
                  <th className="p-3 font-medium text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name} className="border-t border-base-300">
                    <td className="p-3 font-semibold">{r.name}</td>
                    <td className="p-3 text-gray-600">{r.division}</td>
                    <td className="p-3 text-right text-gray-600">{num(r.min)} টাকা</td>
                    <td className="p-3 text-right text-gray-600">{num(r.max)} টাকা</td>
                    <td className="p-3 text-right font-bold">{avgFmt(r.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
        )}
      </section>
    </div>
  );
}