"use client";
import { useState } from "react";

const code = (e: string) => Array.from(e).map((c) => c.codePointAt(0)!.toString(16)).join("-");

export default function Emoji({ e, size = 24 }: { e: string; size?: number }) {
  const [bad, setBad] = useState(false);
  if (bad) return <span style={{ fontSize: size }}>{e}</span>; // ছবি না এলে সাধারণ ইমোজি
  return (
    <img
      src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple@15.0.1/img/apple/64/${code(e)}.png`}
      alt={e}
      width={size}
      height={size}
      className="inline-block align-middle"
      onError={() => setBad(true)}
    />
  );
}