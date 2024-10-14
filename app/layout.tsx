import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "sukushocloud",
    description: "Screenshot as a Service",
};

const hsr = localFont({ src: "./assets/HSR.woff2" });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Toaster richColors />
            <body className={`${hsr.className}`}>{children}</body>
            <script defer src="https://analytics.mikandev.com/script.js" data-website-id="e3d0564b-c15c-4253-af59-f733e2bb1a02"/>
        </html>
    );
}
