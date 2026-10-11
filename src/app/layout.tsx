import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import Navbar from "@/Component/navbar";
import Ticker from "@/Component/ticker";
import Footer from "@/Component/footer";
import { getProducts, getCategories } from "@/lib/api";
import Toast from "@/Component/toast";

const font = Noto_Sans_Bengali({ subsets: ["bengali", "latin"] });
export const metadata: Metadata = { title: "বাজার দর — পণ্যের দাম এক নজরে" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [products, cats] = await Promise.all([getProducts(), getCategories()]);

  return (
    <html lang="bn" data-theme="light">
      <body className={`${font.className} bg-base-200 min-h-screen`}>
        <Navbar cats={cats} />
        <Ticker items={products} />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <Footer />
        <Toast />
      </body>
    </html>
  );
}