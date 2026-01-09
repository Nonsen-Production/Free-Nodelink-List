import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get("url")
    const password = searchParams.get("password")

    if (!url || !password) {
        return NextResponse.json({ error: "Missing url or password" }, { status: 400 })
    }

    let infoError: string | null = null
    let statsError: string | null = null

    try {
        const [infoRes, statsRes] = await Promise.all([
            fetch(`${url}/v4/info`, {
                headers: {
                    Authorization: password,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Accept-Language": "*",
                    "Accept-Encoding": "gzip,br"
                },
                signal: AbortSignal.timeout(5000), // 5 second timeout
            }).catch((e) => {
                console.error(`[API/NodeLink] Info fetch failed for ${url}:`, e.message)
                infoError = e.message
                return null
            }),
            fetch(`${url}/v4/stats`, {
                headers: {
                    Authorization: password,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Accept-Language": "*",
                    "Accept-Encoding": "gzip,br"
                },
                signal: AbortSignal.timeout(5000),
            }).catch((e) => {
                console.error(`[API/NodeLink] Stats fetch failed for ${url}:`, e.message)
                statsError = e.message
                return null
            }),
        ])

        let info = null
        let stats = null

        if (infoRes?.ok) {
            try {
                const text = await infoRes.text()
                info = text ? JSON.parse(text) : null
            } catch (e) {
                console.error(`[API/NodeLink] Info JSON parse error for ${url}:`, e)
                info = null
                infoError = "Invalid JSON response"
            }
        } else if (infoRes) {
            // Handle 4xx/5xx responses that aren't network errors
            infoError = `HTTP ${infoRes.status} ${infoRes.statusText}`
        }

        if (statsRes?.ok) {
            try {
                const text = await statsRes.text()
                stats = text ? JSON.parse(text) : null
            } catch (e) {
                console.error(`[API/NodeLink] Stats JSON parse error for ${url}:`, e)
                stats = null
                statsError = "Invalid JSON response"
            }
        } else if (statsRes) {
            statsError = `HTTP ${statsRes.status} ${statsRes.statusText}`
        }

        return NextResponse.json({
            info,
            stats,
            debug: {
                infoError,
                statsError,
                url
            }
        })
    } catch (error: any) {
        console.error("Proxy fetch error:", error)
        return NextResponse.json({
            info: null,
            stats: null,
            error: error.message
        })
    }
}
