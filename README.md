# Free NodeLink

## What is Free NodeLink?

Free NodeLink is a curated, premium-quality public directory of Lavalink nodes built for developers who need reliable, high-performance audio infrastructure for bots and audio-enabled applications. Instead of spending time testing unstable or abandoned public nodes, Free NodeLink centralizes trusted nodes that prioritize uptime, low latency, and consistent audio quality.

The project aims to reduce setup friction, improve long-term reliability, and provide a dependable backbone for music and audio streaming applications operating across different regions and platforms.

---

## Global Audio Infrastructure

Free NodeLink functions as a global audio infrastructure layer by maintaining and publishing a list of publicly accessible Lavalink nodes distributed across multiple geographic regions. Each listed node is expected to meet baseline performance, availability, and stability standards, making them suitable for real-world and production-level usage.

Key infrastructure goals include:

* High availability with stable and predictable connections
* Low-latency audio streaming for smoother playback
* Regional distribution to minimize network delay
* Consistent performance under sustained load

Developers can freely select the node that best matches their geographic location, latency requirements, or redundancy strategy.

---

## Live Status Widget

Free NodeLink provides a live status widget that allows developers to display real-time node information directly on their website, README files, or project documentation. The widget visually reflects the current availability and operational status of a selected node, enabling quick reliability checks without manual monitoring.

Widgets are automatically generated and continuously updated, requiring no additional setup beyond embedding the provided URL.
> STATS ONLY SUPPORT HTTPS NODE

### Widget Usage

To generate a widget for a specific node, use the following URL format:

```
http://free-nodelink.nyxbot.app/api/nodes/widget?host=<NODE_HOST>
```

Replace `<NODE_HOST>` with the hostname of the Lavalink node you want to display.

### Example

```
https://free-nodelink.nyxbot.app/api/nodes/widget?host=sg1-nodelink.nyxbot.app
```

Embed the widget in Markdown as shown below:

```markdown
![Node Widget](https://free-nodelink.nyxbot.app/api/nodes/widget?host=sg1-nodelink.nyxbot.app)
```

![Node Widget](https://free-nodelink.nyxbot.app/api/nodes/widget?host=sg1-nodelink.nyxbot.app)

A general widget showing the overall status of the public node list is also available:

```markdown
![Widget](https://free-nodelink.nyxbot.app/api/nodes/widget)
```

![Widget](https://free-nodelink.nyxbot.app/api/nodes/widget)

To view the complete and up-to-date list of available nodes, visit:

[Free NodeLink](https://free-nodelink.nyxbot.app)

---

## Custom Widget (External Nodes Supported)

The status widget can also be used for **any Lavalink node**, even if it is not listed on Free NodeLink. This allows node operators to monitor and showcase their own infrastructure using the same widget system.

Simply provide your node configuration using query parameters:

* `host` (Required): Node hostname or IP address
* `port`: Node port (default: `2333`)
* `password`: Node password (default: `youshallnotpass`)
* `secure`: Set to `true` to enable SSL/HTTPS (default: `false`)

### Custom Widget Example

```markdown
![My Custom Node](https://free-nodelink.nyxbot.app/api/nodes/widget?host=my-cool-node.com&port=443&secure=true&password=mypassword)
```

---

## How to Add Your Node to Free NodeLink

Community contributions are encouraged. If you operate a public Lavalink node and want it listed on Free NodeLink, follow the guidelines below to ensure consistency, fairness, and long-term maintainability.

### Contribution Steps

1. Fork the repository and update the `nodelink.json` file with your node information.
2. Submit your changes through a Pull Request.
3. Do not modify, reorder, or overwrite existing node entries.
4. Always append your node entry to the **bottom** of the list.

Submitted nodes may be reviewed to ensure they meet basic availability, stability, and usage requirements.

### Example Node Entry

```
{
    "title": "Singapore Node 1",
    "host": "sg1-nodelink.nyxbot.app",
    // Always use a non-SSL host here if you provide both SSL and non-SSL endpoints
    "port": "3000",
    "password": "nyxbot.app/support",
    "secure": false,
    "sslHost": {
        "host": "sg1-nodelink-ssl.nyxbot.app",
        "port": 443
    },
    // Optional. Set to null if you do not provide an SSL endpoint
    "author": {
        "name": "NYX Project",
        "website": "https://nyxbot.app"
    }
}
```

---

## Host Your Own NodeLink

If you want to deploy and manage your own NodeLink infrastructure, refer to the official NodeLink documentation for setup instructions, configuration options, and best practices:

[NodeLink Documentation](https://nodelink.js.org)

---

## License

Free NodeLink is released under the MIT License. You are free to use, modify, and distribute this project in accordance with the license terms.

For full license details, see the [LICENSE](LICENSE) file.
