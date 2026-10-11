"use client";
import Marquee from "react-fast-marquee";
import type { Product } from "@/lib/api";
import { toBn } from "@/lib/bn";
import Badge from "./Badge";

export default function Ticker({ items }: { items: Product[] }) {
  if (!items.length) return null;
  return (
    <div className="bg-base-200 border-b border-base-300 py-2">
      <Marquee pauseOnHover speed={50} gradient={false}>
        {items.map((p) => (
          <span key={p.id} className="flex items-center gap-2 whitespace-nowrap text-sm mr-10">
            {p.emoji} {p.name} <b>{toBn(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}</b>
          </span>
        ))}
      </Marquee>
    </div>
  );
}