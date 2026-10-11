"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/api";
import { toBn } from "@/lib/bn";
import ProductCard from "./card";

export default function Grid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("default");

  const items = useMemo(() => {
    const a = [...products];
    if (sort === "asc") a.sort((x, y) => x.price - y.price);   // সংখ্যা ধরে সর্ট
    if (sort === "desc") a.sort((x, y) => y.price - x.price);
    return a;
  }, [products, sort]);

  return (
    <>
      <div className="bg-base-100 border border-base-300 rounded-xl p-4 flex items-center justify-end gap-3 mb-4">
        <label className="text-sm text-gray-500">সাজান</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="select select-sm">
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <p className="text-sm text-gray-500 mb-3">মোট {toBn(items.length)}টি পণ্য দেখানো হচ্ছে</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </>
  );
}