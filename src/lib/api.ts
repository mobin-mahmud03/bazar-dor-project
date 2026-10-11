const BASE = "https://openapi.programming-hero.com/api/bazardor";

export type MarketPrice = { name: string; division: string; min: number; max: number };
export type Product = {
  id: string; slug: string; name: string; emoji: string; unit: string;
  price: number; change: number; 
  yesterday: number; lastWeek: number; lastMonth: number;
  category: string; categoryName: string; categoryIcon: string;
  markets: MarketPrice[];
};
export type Category = { slug: string; name: string; icon: string };

type ApiCategory = {
  slug?: string;
  name?: string;
  nameBn?: string;
  icon?: string;
};

type ApiMarket = {
  market?: string;
  division?: string;
  min?: number;
  max?: number;
};

type ApiProduct = {
  id?: string | number;
  slug?: string;
  nameBn?: string;
  image?: string;
  categoryIcon?: string;
  unit?: string;
  today?: number;
  change?: { dir?: "up" | "down"; pct?: number | string };
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  category?: string;
  categoryNameBn?: string;
  markets?: ApiMarket[];
};

const UNITS: Record<string, string> = { kg: "প্রতি কেজি", litre: "প্রতি লিটার", dozen: "প্রতি ডজন", piece: "প্রতি পিস" };

async function get(path: string): Promise<unknown> {
  try {
    const res = await fetch(BASE + path, { next: { revalidate: 300 } });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

function normalize(p: ApiProduct): Product {
  const pct = Math.abs(Number(p.change?.pct) || 0);
  return {
    id: String(p.id ?? ""), slug: p.slug ?? "", name: p.nameBn ?? "", emoji: p.image ?? p.categoryIcon ?? "🛒",
    unit: UNITS[p.unit ?? ""] ?? p.unit ?? "",
    price: Number(p.today ?? 0),
    change: p.change?.dir === "down" ? -pct : p.change?.dir === "up" ? pct : 0,
    yesterday: Number(p.yesterday ?? 0),
    lastWeek: Number(p.lastWeek ?? 0),
    lastMonth: Number(p.lastMonth ?? 0),
    category: p.category ?? "",
    categoryName: p.categoryNameBn ?? "",
    categoryIcon: p.categoryIcon ?? "",
    markets: (p.markets ?? []).map((m: ApiMarket) => ({ name: m.market ?? "", division: m.division ?? "", min: Number(m.min ?? 0), max: Number(m.max ?? 0) })),
  };
}

export async function getProducts(): Promise<Product[]> {
  const j = await get("/products");
  return Array.isArray(j) ? j.map(normalize) : [];
}
export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const j = await get(`/products?category=${encodeURIComponent(slug)}`);
  return Array.isArray(j) ? j.map(normalize) : [];
}
export async function getProduct(slug: string): Promise<Product | null> {
  return (await getProducts()).find((p) => p.slug === slug || p.id === slug) ?? null;
}
export async function getCategories(): Promise<Category[]> {
  const j = await get("/categories");
  //console.log("categories raw:", JSON.stringify(j).slice(0, 300));
  return Array.isArray(j)
    ? j.map((c: ApiCategory) => ({ slug: c.slug ?? "", name: c.nameBn ?? c.name ?? "", icon: c.icon ?? "" }))
    : [];
}
export async function getCategory(slug: string): Promise<Category | null> {
  return (await getCategories()).find((c) => c.slug === slug) ?? null;
}