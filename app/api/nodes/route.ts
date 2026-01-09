import { NextResponse } from "next/server"

const NODES_URL = "https://github.com/Tapao-NonSen/Tapao-NonSen/blob/main/nodelink.json?raw=true"

export async function GET() {
    try {
        const res = await fetch(NODES_URL, {
            next: { revalidate: 60 * 10 },
            headers: {
                Accept: "application/json",
            },
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch nodes: ${res.status}`)
        }

        let text = await res.text()
        text = text.trim()
        if (text.endsWith(",")) {
            text = text.slice(0, -1)
        }
        if (!text.startsWith("[")) {
            text = `[${text}]`
        }

        const nodes = JSON.parse(text)

        return NextResponse.json(nodes)
    } catch (error) {
        console.error("Error fetching nodes:", error)
        return NextResponse.json({ error: "Failed to fetch nodes" }, { status: 500 })
    }
}
