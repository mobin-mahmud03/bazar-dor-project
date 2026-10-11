import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <p className="text-7xl font-bold text-green-600">৪০৪</p>
      <p className="mt-4 text-lg">দুঃখিত, এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি।</p>
      <Link href="/" className="btn btn-success text-white mt-6">হোম পেজে ফিরে যান</Link>
    </div>
  );
}