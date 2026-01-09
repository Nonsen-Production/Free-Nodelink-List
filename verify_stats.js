
import { spawn } from 'child_process';

const testFetch = async () => {
    // Simulate the data from one of the nodes, e.g., Singapore Node 1
    const node = {
        host: "sg1-nodelink.nyxbot.app",
        port: "3000",
        password: "nyxbot.app/support",
        sslHost: {
            host: "sg1-nodelink-ssl.nyxbot.app",
            port: 443
        }
    };

    const baseUrl = node.sslHost ? `https://${node.sslHost.host}:${node.sslHost.port}` : `http://${node.host}:${node.port}`;
    const apiUrl = `http://localhost:3000/api/nodelink?url=${encodeURIComponent(baseUrl)}&password=${encodeURIComponent(node.password)}`;

    console.log(`Fetching from: ${apiUrl}`);

    try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
            console.error(`Fetch failed with status: ${res.status}`);
            const text = await res.text();
            console.error(`Response text: ${text}`);
            return;
        }
        const data = await res.json();
        console.log("Data received:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Fetch threw error:", e);
    }
};

testFetch();
