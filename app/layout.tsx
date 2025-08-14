import { Toaster } from "react-hot-toast";
import Header from "./src/_components/header";
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
        <Toaster position="top-right" />
        <main className="pt-[72.8px]">{children}</main>
      </body>
    </html>
  );
}
