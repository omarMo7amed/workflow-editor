import Header from "@/app/src/_components/header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="pt-[72.8px]">{children}</main>
      </body>
    </html>
  );
}
