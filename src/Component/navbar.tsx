"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Category } from "@/lib/api";
import Emoji from "./Emoji";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Navbar({ cats }: { cats: Category[] }) {
  const path = usePathname();

  const router = useRouter();
  const { data } = authClient.useSession();
  const user = data?.user;

  const signOut = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  const [date] = useState(() =>
    new Date().toLocaleDateString("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );

  return (
    <header className="bg-base-100 border-b border-base-300 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo-icon.png" alt="" className="w-9 h-9" />
          <span>
            <span className="block text-lg font-bold">বাজার দর</span>
            <span className="block text-xs text-gray-500 min-h-4">{date}</span>
          </span>
        </Link>
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="flex items-center gap-2 cursor-pointer">
              {user.image ? (
                <img src={user.image} alt="" className="w-9 h-9 rounded-full object-cover" />
              ) : (
                <span className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="text-sm hidden sm:block">{user.name}</span>
            </label>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 border border-base-300 rounded-xl w-44 p-2 mt-2 shadow z-50">
              <li><Link href="/profile">আমার প্রোফাইল</Link></li>
              <li><button onClick={signOut}>সাইন আউট</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/signin" className="btn btn-sm btn-outline btn-success">সাইন ইন</Link>
            <Link href="/signup" className="btn btn-sm btn-success text-white">সাইন আপ</Link>
          </div>
        )}
      </div>
      <nav className="max-w-6xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto">
        {cats.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm ${path === `/category/${c.slug}` ? "bg-green-600 text-white" : "hover:bg-base-200"}`}
          >
            <Emoji e={c.icon} size={16} /> {c.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}