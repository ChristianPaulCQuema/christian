import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christian Paul Quema | Full-Stack & Mobile Developer",
  description:
    "Portfolio of Christian Paul Quema, a Full-Stack and Mobile Developer with IT technical support experience.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Christian Paul Quema | Full-Stack & Mobile Developer",
    description:
      "Explore selected web and mobile projects, skills, experience, and services by Christian Paul Quema.",
    type: "website",
    images: [
      {
        url: "/assets/profile/christian.jpg",
        width: 1251,
        height: 1536,
        alt: "Christian Paul Quema"
      }
    ]
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem("theme");var prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",saved?saved==="dark":prefersDark);}catch(e){}})();`
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
