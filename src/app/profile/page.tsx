"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Profile() {
  const { data, isPending } = authClient.useSession();
  if (isPending) return <div className="skeleton h-56 max-w-md mx-auto" />;
  const u = data?.user;

  return (
    <div className="max-w-md mx-auto bg-base-100 border border-base-300 rounded-2xl p-8 text-center">
      {u?.image ? (
        <img src={u.image} alt="" className="w-24 h-24 rounded-full object-cover mx-auto" />
      ) : (
        <div className="w-24 h-24 rounded-full bg-green-600 text-white text-4xl font-bold flex items-center justify-center mx-auto">
          {u?.name?.charAt(0).toUpperCase()}
        </div>
      )}
      <h1 className="text-2xl font-bold mt-4">{u?.name}</h1>
      <p className="text-gray-500">{u?.email}</p>
      <Link href="/profile/update" className="btn btn-success text-white mt-5">তথ্য আপডেট করুন</Link>
    </div>
  );
}