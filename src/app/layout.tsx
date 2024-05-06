
"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner"
import AdminNvbar from "@/components/admin/adminNavber";
const inter = Inter({ subsets: ["latin"] });
const vazirFont = localFont({
  src: "../../public/fonts/Vazirmatn[wght].woff2",
});
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={vazirFont.className}>
      <body>
        <ProgressBar
          height="4px"
          color="#000000"
          options={{ showSpinner: true }}
          shallowRouting
        />
        <main>
        <div className="flex flex-col ">
      <div className="absolute h-[8%] min-h-fit w-[100%] z-10 bg-white flex  justify-center items-center shadow-lg">
      <AdminNvbar/>
      </div>
        {children}
      </div>
        <Toaster richColors/>
        </main>
      </body>
    </html>
  );
}
