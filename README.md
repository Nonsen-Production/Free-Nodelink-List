# Free NodeLink

## What is Free NodeLink?

Free NodeLink is a curated, premium-quality public directory of Lavalink nodes designed for developers who need reliable, high-performance audio infrastructure for bots and audio-enabled applications. Instead of hunting for unstable or outdated nodes, Free NodeLink centralizes trusted public nodes that prioritize uptime, low latency, and consistent audio quality.

This project exists to reduce setup friction, improve user experience, and provide a dependable backbone for music and audio streaming applications across different regions.

---

## Global Audio Infrastructure

Free NodeLink operates as a global audio infrastructure layer by maintaining and publishing a list of publicly accessible Lavalink nodes distributed across multiple regions. Each listed node is expected to meet baseline performance and stability standards, making them suitable for production use.

Key goals of the infrastructure include:

* High availability and stable connections
* Low-latency audio streaming
* Regional coverage to reduce network delay
* Consistent performance under load

Developers can freely choose the node that best fits their geographic location or application needs.

---

## Live Status Widget

Free NodeLink provides a live status widget that allows developers to display real-time node information directly on their website, README files, or documentation. This widget reflects the current availability and status of a selected node, helping users quickly assess reliability.

The widget is automatically generated and updated, requiring no additional setup beyond embedding the provided URL.

### Widget Usage

To generate a widget for a specific node, use the following URL format:

```
http://free-nodelink.nyxbot.app/api/nodes/widget?host=<NODE_HOST>
```

Replace `<NODE_HOST>` with the hostname of the node you want to display.

### Example

```
http://free-nodelink.nyxbot.app/api/nodes/widget?host=sg1-nodelink.nyxbot.app
```

You can embed the widget in Markdown as shown below:

```markdown
![Node Widget](http://free-nodelink.nyxbot.app/api/nodes/widget?host=sg1-nodelink.nyxbot.app)
```
![Node Widget](http://free-nodelink.nyxbot.app/api/nodes/widget?host=sg1-nodelink.nyxbot.app)

A general widget showing the overall node list status is also available:

```
![Widget](http://free-nodelink.nyxbot.app/api/nodes/widget)
```
![Widget](http://free-nodelink.nyxbot.app/api/nodes/widget)

To view the complete list of available nodes, visit:

[Free NodeLink](http://free-nodelink.nyxbot.app)

---

## How to Add Your Node to Free NodeLink

Community contributions are welcome. If you operate a public Lavalink node and want it listed on Free NodeLink, follow the guidelines below to ensure fairness and consistency.

### Contribution Steps

1. Fork the repository and update the `nodelink.json` file with your node’s information.
2. Submit your changes through a Pull Request.
3. Do not modify or overwrite existing node entries.
4. Always append your node entry to the bottom of the list to preserve ordering and history.

All submitted nodes may be reviewed to ensure they meet basic quality and availability standards.

## Host your own NodeLink
Plese check the [Nodelink](https://nodelink.js.org) section for more information.

---

## License

Free NodeLink is released under the MIT License. You are free to use, modify, and distribute this project in accordance with the license terms.

For more details, see the [LICENSE](LICENSE) file.