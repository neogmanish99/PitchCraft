import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

// import "easymde/dist/easymde.min.css";

// const playwrite = Playwrite_AU_SA({
//     subsets: ["latin"], // or whatever subset is needed
//     weight: ["100", "200", "300", "400"],
//     variable: "--font-playwrite",
//     display: "swap",
//     style: ["normal"],
// });

export const metadata: Metadata = {
    title: "YC_Directory",
    description: "Lets Blog!!",
};

const playwrite = localFont({
    src: [
        {
            path: "../public/fonts/PlaywriteAUSA-Thin.ttf",
            weight: "100",
            style: "normal",
        },
        {
            path: "../public/fonts/PlaywriteAUSA-ExtraLight.ttf",
            weight: "200",
            style: "normal",
        },
        {
            path: "../public/fonts/PlaywriteAUSA-Light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/PlaywriteAUSA-Regular.ttf",
            weight: "400",
            style: "normal",
        },
    ],
    variable: "--font-playwrite",
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={playwrite.variable}>
            <body>
                <Providers>
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
