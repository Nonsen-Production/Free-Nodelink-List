import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get("url")
    const password = searchParams.get("password")

    if (!url || !password) {
        return NextResponse.json({ error: "Missing url or password" }, { status: 400 })
    }

    try {
        const [infoRes, statsRes] = await Promise.all([
            fetch(`${url}/v4/info`, {
                headers: { Authorization: password },
                signal: AbortSignal.timeout(5000), // 5 second timeout
            }).catch(() => null),
            fetch(`${url}/v4/stats`, {
                headers: { Authorization: password },
                signal: AbortSignal.timeout(5000),
            }).catch(() => null),
        ])

        let info = null
        let stats = null

        if (infoRes?.ok) {
            try {
                const text = await infoRes.text()
                info = text ? JSON.parse(text) : null
            } catch {
                info = null
            }
        }

        if (statsRes?.ok) {
            try {
                const text = await statsRes.text()
                stats = text ? JSON.parse(text) : null
            } catch {
                stats = null
            }
        }

        return NextResponse.json({ info, stats })
    } catch (error) {
        console.error("Proxy fetch error:", error)
        return NextResponse.json({ info: null, stats: null })
    }
}
