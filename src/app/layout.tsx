import type { Metadata } from "next";
import "tailwindcss/tailwind.css"
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "../../components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BMOI APP ",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"  rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.7.3/dist/full.min.css" rel="stylesheet" type="text/css" />
      </head>
      <body className={inter.className}>
        <Sidebar/>
        <div className="p-4 sm:ml-64">
            <div className="p-4  border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            {children}
            </div>
        </div>
      </body>
    </html>
  );
}
