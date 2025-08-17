import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard/workflows", label: "Dashboard" },
  { href: "/editor", label: "Editor" },
  { href: "/docs", label: "Documentation" },
];

export default function NavItems({
  extraStyle,
  pathname,
}: {
  extraStyle?: string;
  pathname?: string;
}) {
  return (
    <>
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-slate-600 ${
            pathname === href ? "text-slate-900 font-bold" : "font-medium "
          } ${extraStyle || ""}`}
        >
          {label}
        </Link>
      ))}
    </>
  );
}
