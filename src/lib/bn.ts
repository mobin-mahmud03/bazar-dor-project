const BN = "০১২৩৪৫৬৭৮৯";
export const toBn = (v: number | string) => String(v).replace(/\d/g, (d) => BN[+d]);