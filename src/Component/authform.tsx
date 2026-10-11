// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { authClient } from "@/lib/auth-client";

// export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
//   const up = mode === "signup";
//   const router = useRouter();
//   const [busy, setBusy] = useState(false);

//   useEffect(() => {
//     if (new URLSearchParams(location.search).get("error") === "login-required") {
//       toast.error("এগিয়ে যেতে আগে সাইন ইন করুন");
//     }
//   }, []);

//   async function submit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const f = new FormData(e.currentTarget);
//     const name = String(f.get("name") || "").trim();
//     const email = String(f.get("email"));
//     const password = String(f.get("password"));

//     if (up && !name) return toast.error("নাম দিন");
//     if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

//     setBusy(true);
//     const { error } = up
//       ? await authClient.signUp.email({ name, email, password })
//       : await authClient.signIn.email({ email, password });
//     setBusy(false);

//     if (error) return toast.error(error.message || "কিছু ভুল হয়েছে, আবার চেষ্টা করুন");
//     toast.success(up ? "রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন" : "সাইন ইন সফল হয়েছে");
//     router.push(up ? "/signin" : "/");
//     router.refresh();
//   }

//   const social = (provider: "google" | "github") =>
//     authClient.signIn.social({ provider, callbackURL: "/" });

//   const handleGoogleSignIn = async () => {
//     const data = await authClient.signIn.social({
//     provider: "google",
//       callbackURL: "/"
//     });
//   }

//   const handleGitHubSignIn = async () => {
//     const data = await authClient.signIn.social({
//       provider: "github",
//       callbackURL: "/"
//     });
//   }

//   return (
//     <div className="max-w-md mx-auto bg-base-100 border border-base-300 rounded-2xl p-6 mt-8">
//       <form onSubmit={submit} className="flex flex-col gap-3">
//         <h1 className="text-2xl font-bold text-center">{up ? "নতুন অ্যাকাউন্ট খুলুন" : "সাইন ইন করুন"}</h1>
//         {up && <input name="name" placeholder="নাম" className="input input-bordered w-full" />}
//         <input name="email" type="email" required placeholder="ইমেইল" className="input input-bordered w-full" />
//         <input name="password" type="password" required placeholder="পাসওয়ার্ড" className="input input-bordered w-full" />
//         <button disabled={busy} className="btn btn-success text-white">
//           {busy && <span className="loading loading-spinner" />}
//           {up ? "রেজিস্টার" : "সাইন ইন"}
//         </button>
//         <div className="divider my-0">অথবা</div>
//         <button onClick={handleGoogleSignIn} className="btn btn-outline">Google দিয়ে চালিয়ে যান</button>
//         <button onClick={handleGitHubSignIn} className="btn btn-outline">GitHub দিয়ে চালিয়ে যান</button>
//         <p className="text-sm text-center">
//           {up ? (
//             <>অ্যাকাউন্ট আছে? <Link className="link link-success" href="/signin">সাইন ইন</Link></>
//           ) : (
//             <>নতুন ব্যবহারকারী? <Link className="link link-success" href="/signup">রেজিস্টার করুন</Link></>
//           )}
//         </p>
//       </form>
//     </div>
//   );
// }