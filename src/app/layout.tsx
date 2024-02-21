import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "theme";

export const metadata: Metadata = {
  title: "Quick URL Shortener",
  description: "Quick URL Shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
