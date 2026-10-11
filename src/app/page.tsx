import { getProducts } from "@/lib/api";
import ProductCard from "@/Component/card";

const grid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4";

export default async function Home() {
  const products = await getProducts();
  const up = [...products].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const down = [...products].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);
  return (
    <div className="space-y-14">
      <section className="hero bg-base-100 rounded-2xl border border-base-300">
        <div className="hero-content flex-col-reverse lg:flex-row gap-8 p-8">
          <div className="text-center lg:text-left">
            <p className="text-amber-500 font-semibold">🛒 আজকের বাজার</p>
            <h1 className="text-3xl sm:text-5xl font-bold my-3 leading-tight">নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে</h1>
            <p className="text-gray-600 mb-5">চাল, ডাল, সবজি, মাছ-মাংস — আজকের দাম ও দামের ওঠানামা জানুন সহজেই।</p>
            <a href="#all-products" className="btn btn-success text-white">সব পণ্যের দাম দেখুন</a>
          </div>
          <img src="/bazar-hero.png" alt="বাজার দর" className="w-full max-w-xs lg:max-w-sm rounded-xl" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">আজ দাম বেড়েছে <span className="text-green-600">▲</span></h2>
        <div className={grid}>{up.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">আজ দাম কমেছে <span className="text-red-600">▼</span></h2>
        <div className={grid}>{down.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      <section id="all-products" className="scroll-mt-24">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="text-gray-500 mb-4">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
        <div className={grid}>{products.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
    </div>
  );
}