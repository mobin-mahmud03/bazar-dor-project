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

      