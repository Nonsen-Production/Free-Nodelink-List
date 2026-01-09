import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const NODES_URL = "https://github.com/Tapao-NonSen/Free-Nodelink-List/blob/main/nodelink.json?raw=true"

// Helper to fetch all nodes
async function getNodes() {
    try {
        const res = await fetch(NODES_URL, {
            next: { revalidate: 60 * 10 },
            headers: { Accept: "application/json" },
        })
        if (!res.ok) return []
        return await res.json()
    } catch (e) {
        console.error("Failed to fetch nodes", e)
        return []
    }
}

// Helper to fetch live stats for a single node
async function getLiveStats(url: string, password: string) {
    try {
        const statsRes = await fetch(`${url}/v4/stats`, {
            headers: {
                Authorization: password,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Accept-Language": "*",
                "Accept-Encoding": "gzip,br"
            },
            signal: AbortSignal.timeout(3000), // 3s timeout for widget
        })
        if (!statsRes.ok) return null
        return await statsRes.json()
    } catch {
        return null
    }
}

function generateSvg(content: string, width = 400, height = 180) {
    return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600;700&amp;display=swap');
        .text { font-family: 'Kanit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; fill: white; }
        .label { font-family: 'Kanit', sans-serif; font-size: 10px; fill: #a8a29e; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
        .value { font-family: 'Kanit', sans-serif; font-size: 12px; font-weight: 600; fill: #e7e5e4; }
        .title { font-family: 'Kanit', sans-serif; font-size: 16px; font-weight: 700; fill: white; }
        .sub { font-family: 'Kanit', sans-serif; font-size: 11px; fill: #78716c; }
        .dot { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
    </style>
    <rect width="${width}" height="${height}" rx="12" fill="#0C0C10" />
    <rect width="${width}" height="${height}" rx="12" fill="url(#grad)" fill-opacity="0.1" stroke="white" stroke-opacity="0.1" />
    <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
            <stop stop-color="#06b6d4" />
            <stop offset="1" stop-color="#14b8a6" />
        </linearGradient>
    </defs>
    ${content}
</svg>`
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const hostQuery = searchParams.get("host")
    const nodes = await getNodes()

    // --- Summary Card ---
    if (!hostQuery) {
        const totalNodes = nodes.length
        const content = `
            <g transform="translate(24, 24)">
                <text x="0" y="16" class="title">NodeLink Network</text>
                <text x="0" y="34" class="sub">Free Public Lavalink Nodes</text>
                
                <line x1="0" y1="56" x2="352" y2="56" stroke="white" stroke-opacity="0.1" />
                
                <g transform="translate(0, 80)">
                    <text x="0" y="10" class="label">Total Nodes</text>
                    <text x="0" y="30" class="title" style="font-size: 24px; fill: #06b6d4;">${totalNodes}</text>
                </g>
                
                <g transform="translate(120, 80)">
                     <text x="0" y="10" class="label">Status</text>
                     <text x="0" y="30" class="value" style="fill: #10b981;">Operational</text>
                </g>

                <g transform="translate(0, 130)">
                    <text x="0" y="0" style="font-size: 10px; fill: #57534e;">Powered by Nyxbot.app</text>
                </g>
            </g>
            <circle cx="366" cy="34" r="4" fill="#10b981" class="dot"/>
        `
        return new NextResponse(generateSvg(content), {
            headers: { "Content-Type": "image/svg+xml", "Cache-Control": "no-cache, max-age=300" },
        })
    }

    // --- Specific Node Card ---
    let node = nodes.find((n: any) => n.host === hostQuery || (typeof n.sslHost === 'string' ? n.sslHost === hostQuery : n.sslHost?.host === hostQuery))

    if (!node) {
        if (!hostQuery) {
            const content = `
                <text x="200" y="90" text-anchor="middle" class="title" fill="#ef4444">Node Not Found</text>
            `
            return new NextResponse(generateSvg(content), {
                headers: { "Content-Type": "image/svg+xml" },
            })
        }

        // Custom node from params
        const port = searchParams.get("port")
        const password = searchParams.get("password")
        const secure = searchParams.get("secure") === "true"

        node = {
            title: hostQuery,
            host: hostQuery,
            port: port || "2333",
            password: password || "youshallnotpass",
            secure: secure,
            sslHost: secure ? { host: hostQuery, port: port ? parseInt(port) : 443 } : null
        }
    }

    const sslHostStr = typeof node.sslHost === 'string' ? node.sslHost : node.sslHost?.host
    const sslPort = typeof node.sslHost === 'object' ? node.sslHost?.port : 443

    const protocol = node.sslHost ? "https" : "http"
    const host = sslHostStr || node.host
    const port = node.sslHost ? sslPort : node.port
    const baseUrl = `${protocol}://${host}${protocol === "https" && Number(port) === 443 ? "" : `:${port}`}`

    // Fetch live stats
    const stats = await getLiveStats(baseUrl, node.password)
    const isOnline = !!stats
    const statusColor = isOnline ? "#10b981" : "#ef4444"
    const statusText = isOnline ? "Online" : "Offline"

    // Parse stats
    const players = stats?.playingPlayers ?? 0
    const cpu = stats?.cpu?.systemLoad ? Math.round(stats.cpu.systemLoad * 100) : 0
    const memory = stats?.memory?.used ? Math.round(stats.memory.used / 1024 / 1024) : 0
    const uptime = stats?.uptime ? Math.floor(stats.uptime / 3600000) + "h" : "0h"

    const content = `
        <image href="http://free-nodelink.nyxbot.app/hero-banner.png" x="0" y="0" width="400" height="200" preserveAspectRatio="xMidYMid slice" opacity="0.2" clip-path="url(#clip)" />
        <clipPath id="clip">
            <rect width="400" height="200" rx="12" />
        </clipPath>
        <g transform="translate(24, 24)">
            <text x="0" y="14" class="title">${node.title || node.name || "Unknown Node"}</text>
            <text x="0" y="34" class="sub">${host}:${port}</text>
            
            <line x1="0" y1="56" x2="352" y2="56" stroke="white" stroke-opacity="0.1" />

            <!-- Row 1 -->
            <g transform="translate(0, 84)">
                <text class="label">Status</text>
                <text y="20" class="value" style="fill: ${statusColor}">${statusText}</text>
            </g>
             <g transform="translate(100, 84)">
                <text class="label">Uptime</text>
                <text y="20" class="value">${uptime}</text>
            </g>
            <g transform="translate(200, 84)">
                <text class="label">Players</text>
                <text y="20" class="value">${players}</text>
            </g>

            <!-- Row 2 -->
             <g transform="translate(0, 130)">
                <text class="label">CPU</text>
                <text y="20" class="value">${cpu}%</text>
            </g>
            <g transform="translate(100, 130)">
                <text class="label">RAM</text>
                <text y="20" class="value">${memory} MB</text>
            </g>
            <g transform="translate(200, 130)">
                <text class="label">Secure</text>
                <text y="20" class="value" style="fill: ${node.secure || node.sslHost ? "#10b981" : "#a8a29e"}">${node.secure || node.sslHost ? "Yes" : "No"}</text>
            </g>
        </g>
        <circle cx="366" cy="24" r="4" fill="${statusColor}" class="dot"/>
    `

    return new NextResponse(generateSvg(content, 400, 200), {
        headers: { "Content-Type": "image/svg+xml", "Cache-Control": "no-cache, max-age=60" },
    })
}
