import { NextResponse } from "next/server"

const NODES_URL = "https://raw.githubusercontent.com/Tapao-NonSen/Free-Nodelink-List/refs/heads/main/nodelink.json"

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

        const nodes = await res.json()

        return NextResponse.json(nodes)
    } catch (error) {
        console.error("Error fetching nodes:", error)
        return NextResponse.json({ error: "Failed to fetch nodes" }, { status: 500 })
    }
}
