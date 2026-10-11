"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfile() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  if (isPending) return <div className="skeleton h-56 max-w-md mx-auto" />;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const image = String(f.get("image") || "").trim();
    if (!name) return toast.error("নাম খালি রাখা যাবে না");

    setBusy(true);
    const { error } = await authClient.updateUser({ name, ...(image && { image }) });
    setBusy(false);
    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে", { id: "upd" });
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-base-100 border border-base-300 rounded-2xl p-6 flex flex-col gap-3">
      <h1 className="text-2xl font-bold text-center">তথ্য আপডেট</h1>
      <input name="name" defaultValue={data?.user?.name} placeholder="নাম" className="input w-full" />
      <input name="image" defaultValue={data?.user?.image ?? ""} placeholder="ছবির লিংক (ঐচ্ছিক)" className="input w-full" />
      <button disabled={busy} className="btn btn-success text-white">
        {busy && <span className="loading loading-spinner" />}তথ্য আপডেট করুন
      </button>
    </form>
  );
}