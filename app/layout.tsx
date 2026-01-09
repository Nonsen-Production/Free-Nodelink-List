import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "Free NodeLink Hosting List",
    description: "Premium, high-performance public Lavalink nodes list for your audio applications.",
    icons: {
        icon: "https://raw.githubusercontent.com/1Lucas1apk/lab/master/mwc2h6q%20-%20Imgur.png",
    },
}

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
