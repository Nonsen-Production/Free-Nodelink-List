import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "Free NodeLink Hosting List | Public Lavalink Nodes",
    description:
        "A curated list of free, high-performance public NodeLink and Lavalink audio nodes. Check live status, supported sources, and connection details for bots and audio applications.",
    keywords: [
        "NodeLink",
        "Lavalink",
        "public lavalink nodes",
        "free lavalink",
        "audio nodes",
        "discord music bot",
        "audio streaming infrastructure",
    ],
    authors: [{ name: "NyxBot" }],
    themeColor: "#2be3d7",
    creator: "NyxBot",
    publisher: "NyxBot",
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Free NodeLink Hosting List • Public Lavalink Nodes",
        description:
            "Explore a free public NodeLink & Lavalink hosting list with live node status and supported sources. Built for audio apps and Discord bots.",
        url: "https://free-nodelink.nyxbot.app",
        siteName: "Free NodeLink Hosting List",
        type: "website",
        images: [
            {
                url: "https://free-nodelink.nyxbot.app/hero-banner.png",
                width: 1200,
                height: 630,
                alt: "Free NodeLink Hosting List",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free NodeLink Hosting List • Lavalink Nodes",
        description:
            "Free public Lavalink & NodeLink nodes with live status and source support. Simple, fast, and bot-friendly.",
        images: ["https://free-nodelink.nyxbot.app/hero-banner.png"],
    },
    icons: {
        icon: "https://raw.githubusercontent.com/1Lucas1apk/lab/master/mwc2h6q%20-%20Imgur.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
