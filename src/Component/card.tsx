import Link from "next/link";
import type { Product } from "@/lib/api";
import { toBn } from "@/lib/bn";
import Badge from "./Badge";
import Emoji from "@/Component/Emoji";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.slug}`} className="block bg-base-100 border border-base-300 rounded-xl p-4 hover:shadow-md transition">
      <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-base-200 flex items-center justify-center"><Emoji e={p.emoji} size={32} /></div>
        <div>
          <h3 className="font-bold">{p.name}</h3>
          <p className="text-xs text-gray-500">{p.unit}</p>
        </div>
      </div>
      <div className="flex items-end justify-between mt-4">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-lg font-bold">{toBn(p.price)} টাকা</p>
        </div>
        <Badge c={p.change} />
      </div>
    </Link>
  );
}