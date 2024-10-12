import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sastri Library Management System",
  description: `Sastri Library Management System is a system used to manage the library processes of 
  Sastri College Academy in Durban. It introducces seamless functional processes like book loaning, book reservations,
   overdue payments`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/logo.png" type="image/x-icon" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
