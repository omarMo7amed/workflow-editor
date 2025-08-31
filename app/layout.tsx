import { Toaster } from "react-hot-toast";
import Header from "./_components/Header";
import "./globals.css";

export const metadata = {
  title: {
    default: "Workflow Editor",
    template: "%s",
  },
  description: "A workflow editor to create and manage workflows.",
  icons: {
    icon: "/workflow.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/workflow.svg" type="image/svg+xml" />
      </head>
      <body>
        <Header />
        <Toaster position="top-right" />
        <main className="pt-[72.8px] min-h-screen">{children}</main>
      </body>
    </html>
  );
}
