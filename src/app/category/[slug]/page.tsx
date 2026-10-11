import { notFound } from "next/navigation";
import { getCategory, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/bn";
import Grid from "@/Component/grid";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [cat, products] = await Promise.all([getCategory(slug), getProductsByCategory(slug)]);
  if (!cat) notFound();

  return (
    <div>
      <div className="bg-base-100 border border-base-300 rounded-xl p-5 flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-base-200 flex items-center justify-center text-3xl">{cat.icon}</div>
        <div>
          <h1 className="text-2xl font-bold">{cat.name}</h1>
          <p className="text-sm text-gray-500">{toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>
      {products.length ? <Grid products={products} /> : <p className="text-center py-16 text-gray-500">এই ক্যাটাগরিতে কোনো পণ্য নেই।</p>}
    </div>
  );
}