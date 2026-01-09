"use client"

import Image from "next/image"
import Link from "next/link"
import {
    Copy,
    Check,
    Activity,
    Zap,
    Mic2,
    ListVideo,
    Radio,
    Sliders,
    MessageSquare,
    Search,
    ArrowRight,
    ShieldCheck,
    Globe,
    Music,
    FileText,
    Cpu,
    Clock,
    Users,
    Lock,
    Unlock,
    RefreshCw,
    ChevronDown,
    ChevronUp,
    Sparkles,
    Layers,
    Signal,
    Database,
    ExternalLink,
    X,
    Loader2,
} from "lucide-react"
import { useState, useEffect, useCallback, Suspense, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Ad, NodeInfo, NodeStats, NodeConfig } from "./types"

// --- Copy Button ---
const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    return (
        <button
            onClick={handleCopy}
            className="p-1 rounded bg-white/5 hover:bg-cyan-500/20 transition-all text-stone-500 hover:text-cyan-400"
            title="Copy"
        >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
        </button>
    )
}

const NodeCard = ({
    config,
    info,
    stats,
    loading,
    onRefresh,
}: {
    config: NodeConfig
    info: NodeInfo | null
    stats: NodeStats | null
    loading: boolean
    onRefresh: () => void
}) => {
    const [showSSL, setShowSSL] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const isOnline = info?.isNodelink === true
    const currentHost = showSSL && config.sslHost ? config.sslHost : config.host
    const currentSecure = showSSL && config.sslHost ? true : config.secure

    const formatUptime = (ms: number) => {
        const hours = Math.floor(ms / 3600000)
        const days = Math.floor(hours / 24)
        if (days > 0) return `${days}d ${hours % 24}h`
        return `${hours}h`
    }

    const formatMemory = (bytes: number) => {
        return `${(bytes / (1024 * 1024)).toFixed(0)}MB`
    }

    return (
        <div className="group relative bg-[#0a0a0f] border border-white/[0.06] rounded-xl overflow-hidden hover:border-cyan-500/20 transition-all duration-300">
            {/* Header */}
            <div className="p-4 pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        {/* Status Indicator */}
                        <div className="relative shrink-0">
                            <div
                                className={`w-2 h-2 rounded-full ${isOnline ? "bg-emerald-500" : loading ? "bg-amber-500 animate-pulse" : "bg-stone-700"}`}
                            />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-semibold text-sm text-white truncate">{config.title}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                {loading ? (
                                    <span className="text-xs text-stone-500">Connecting...</span>
                                ) : isOnline ? (
                                    <span className="text-xs text-emerald-500">Online</span>
                                ) : (
                                    <span className="text-xs text-stone-600">Offline</span>
                                )}
                                {info && <span className="text-xs font-mono text-cyan-500/80">v{info.version.semver}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                        {config.sslHost && (
                            <button
                                onClick={() => setShowSSL(!showSSL)}
                                className={`p-1.5 rounded-md transition-all text-[10px] font-medium ${showSSL ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-stone-500 hover:text-stone-300"}`}
                                title={showSSL ? "SSL Mode" : "Standard Mode"}
                            >
                                {showSSL ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                            </button>
                        )}
                        <button
                            onClick={onRefresh}
                            disabled={loading}
                            className="p-1.5 rounded-md bg-white/5 text-stone-500 hover:text-cyan-400 transition-all disabled:opacity-50"
                            title="Refresh"
                        >
                            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Connection Details */}
            <div className="mx-4 mb-3 p-3 bg-black/40 rounded-lg font-mono text-xs space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-stone-600">Host</span>
                    <div className="flex items-center gap-2">
                        <span className="text-stone-300 truncate max-w-[180px]">{currentHost}</span>
                        <CopyButton text={currentHost} />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-stone-600">Port</span>
                    <div className="flex items-center gap-2">
                        <span className="text-stone-300">{config.port}</span>
                        <CopyButton text={config.port} />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-stone-600">Password</span>
                    <div className="flex items-center gap-2">
                        <span className="text-stone-300 truncate max-w-[180px]">{config.password}</span>
                        <CopyButton text={config.password} />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-stone-600">SSL</span>
                    <span className={currentSecure ? "text-emerald-400" : "text-stone-500"}>
                        {currentSecure ? "true" : "false"}
                    </span>
                </div>
            </div>

            {/* Stats Row */}
            {stats && (
                <div className="mx-4 mb-3 flex items-center gap-1.5 text-xs overflow-x-auto">
                    <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.03] rounded text-stone-500">
                        <Users className="w-3 h-3 text-cyan-500/70" />
                        <span className="text-white">
                            {stats.playingPlayers}/{stats.players}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.03] rounded text-stone-500">
                        <Clock className="w-3 h-3 text-teal-500/70" />
                        <span className="text-white">{formatUptime(stats.uptime)}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.03] rounded text-stone-500">
                        <Database className="w-3 h-3 text-violet-500/70" />
                        <span className="text-white">{formatMemory(stats.memory.used)}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.03] rounded text-stone-500">
                        <Cpu className="w-3 h-3 text-amber-500/70" />
                        <span className="text-white">{(stats.cpu.systemLoad * 100).toFixed(0)}%</span>
                    </div>
                </div>
            )}

            {/* Author */}
            {config.author && (
                <div className="mx-4 mb-3 flex items-center gap-1.5 text-xs text-stone-600">
                    <span>Hosted by</span>
                    {config.author.website ? (
                        <a
                            href={config.author.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-500/80 hover:text-cyan-400 font-medium inline-flex items-center gap-0.5"
                        >
                            {config.author.name}
                            <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                    ) : (
                        <span className="text-stone-400 font-medium">{config.author.name}</span>
                    )}
                </div>
            )}

            {/* Expandable Details */}
            {info && (
                <div className="border-t border-white/[0.04]">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-stone-600 hover:text-cyan-400 transition-colors"
                    >
                        {expanded ? (
                            <>
                                <ChevronUp className="w-3 h-3" /> Hide details
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-3 h-3" /> {info.sourceManagers.length} sources, {info.filters.length} filters
                            </>
                        )}
                    </button>

                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="px-4 pb-4 space-y-3 overflow-hidden"
                            >
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">Sources</span>
                                    <div className="flex flex-wrap gap-1">
                                        {info.sourceManagers.map((source) => (
                                            <span
                                                key={source}
                                                className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400/80 px-1.5 py-0.5 rounded"
                                            >
                                                {source}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">Filters</span>
                                    <div className="flex flex-wrap gap-1">
                                        {info.filters.map((filter) => (
                                            <span
                                                key={filter}
                                                className="text-[10px] font-mono bg-violet-500/10 text-violet-400/80 px-1.5 py-0.5 rounded"
                                            >
                                                {filter}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}

// --- Icons ---
const Icons = {
    YouTube: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    ),
    Spotify: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.26.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.54.3.72 1.02.42 1.561-.3.42-1.02.599-1.561.299z" />
        </svg>
    ),
    AppleMusic: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.401-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.785-.455-2.105-1.245a1.986 1.986 0 01-.063-1.41c.23-.65.712-1.03 1.36-1.22.316-.094.643-.148.963-.21.34-.062.677-.133 1.003-.26.276-.106.437-.298.45-.606.01-.176.006-.355.006-.532V8.38c0-.273-.056-.328-.322-.297-.48.054-.962.106-1.44.165-1.28.156-2.56.316-3.84.473-.176.022-.247.093-.252.277-.004.096 0 .19 0 .287v6.913c0 .45-.055.893-.257 1.3-.298.6-.772.972-1.414 1.14-.326.085-.662.143-1 .148-.98.015-1.823-.486-2.122-1.284a2.023 2.023 0 01.058-1.63c.284-.613.78-.99 1.433-1.17.287-.08.58-.132.874-.183.383-.067.77-.116 1.144-.22.286-.08.457-.282.474-.58.008-.136.003-.274.003-.41v-9.36c0-.158.03-.294.165-.396.135-.103.288-.14.454-.14.175 0 .35.03.522.058.63.102 1.258.215 1.887.32 1.08.18 2.158.354 3.236.537.608.103 1.216.216 1.82.342.162.035.305.09.41.235.088.12.12.256.12.4v5.605z" />
        </svg>
    ),
    Bandcamp: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z" />
        </svg>
    ),
    Tidal: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12.012 3.992L8.008 8 4.004 4.008 8.004 0 12.012 3.992zM8.004 8.004L4 12.012 8.004 16.012 12.008 12 8.004 8.004zM16.012 8.004l-4.004 4.008 4.004 4.008 4.004-4.008-4.004-4.008zM12.012 16.012l-4.004 4.008 4.004 4.008 4.004-4.008-4.004-4.008z" />
        </svg>
    ),
    Deezer: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M13.295 8.169h2.518v3.684h-2.518zm0 5.253h2.518v3.685h-2.518zm3.921-5.253h2.518v3.684h-2.518zm0 5.253h2.518v3.685h-2.518zM9.369 13.422h2.517v3.685H9.369zm-3.922 0h2.518v3.685H5.447zm3.922-5.253h2.517v3.684H9.369zm-3.922-5.255h2.518v3.684H5.447zM.5 13.422h3.686v3.685H.5zm0-5.253h3.686v3.684H.5zm0-5.255h3.686v3.684H.5z" />
        </svg>
    ),
    Pandora: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M1.88 0h9.327c5.174 0 9.074 3.423 9.074 8.653 0 5.617-4.102 8.783-9.172 8.783h-2.04v6.564H1.88V0zm9.327 12.338c2.14 0 3.766-1.168 3.766-3.81 0-2.434-1.624-3.423-3.766-3.423H7.189v7.233h4.018z" />
        </svg>
    ),
    LastFm: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M10.584 17.21l-.88-2.392s-1.43 1.594-3.573 1.594c-1.897 0-3.244-1.649-3.244-4.288 0-3.382 1.704-4.591 3.381-4.591 2.42 0 3.189 1.567 3.849 3.574l.88 2.749c.88 2.666 2.529 4.81 7.285 4.81 3.409 0 5.718-1.044 5.718-3.793 0-2.227-1.265-3.381-3.63-3.931l-1.758-.385c-1.21-.275-1.567-.77-1.567-1.595 0-.934.742-1.484 1.952-1.484 1.32 0 2.034.495 2.144 1.677l2.749-.33c-.22-2.474-1.924-3.492-4.729-3.492-2.474 0-4.893.935-4.893 3.932 0 1.87.907 3.051 3.189 3.601l1.87.44c1.402.33 1.869.825 1.869 1.68 0 1.046-1.012 1.485-2.913 1.485-2.83 0-4.013-1.485-4.673-3.52L12.96 9.54c-1.18-3.653-3.05-4.921-6.676-4.921C2.638 4.619 0 7.175 0 12.268c0 4.893 2.639 7.12 6.291 7.12 3.656 0 4.293-1.018 4.293-2.178" />
        </svg>
    ),
    Twitch: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
        </svg>
    ),
    Instagram: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
    ),
    Vimeo: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M22.875 10.063c-2.442 5.217-8.636 12.019-11.69 12.019-3.538 0-4.085-7.533-5.811-12.572-1.042-2.977-2.155-2.078-3.324-1.03l-2.05-2.68c2.615-2.298 5.253-4.94 6.9-5.018 1.832-.085 2.962 1.096 3.414 4.103 1.154 7.697 1.637 8.356 3.018 8.356 1.171 0 4.026-4.957 4.128-6.643.085-1.428-1.006-1.503-2.146-1.074.805-2.636 2.396-3.87 4.773-3.921 2.508-.052 3.86 1.474 2.788 8.46" />
        </svg>
    ),
    Reddit: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
    ),
    Bilibili: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.854l-1.327-1.327c-.379-.379-.379-.996 0-1.374.379-.379.996-.379 1.374 0l2.475 2.475h6.56L17.742.952c.379-.379.996-.379 1.374 0 .379.379.379.996 0 1.374l-1.303 1.327z" />
        </svg>
    ),
    Mix: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
        </svg>
    ),
}

const streamSources = [
    { name: "YouTube", keys: ["youtube", "ytsearch", "ytmsearch"], color: "#FF0000", icon: Icons.YouTube },
    { name: "Spotify", keys: ["spsearch"], color: "#1DB954", icon: Icons.Spotify, searchToPlay: true },
    { name: "Deezer", keys: ["dzsearch"], color: "#A238FF", icon: Icons.Deezer, searchToPlay: true },
    { name: "Apple Music", keys: ["amsearch"], color: "#FA243C", icon: Icons.AppleMusic, searchToPlay: true },
    { name: "Tidal", keys: ["tdsearch"], color: "#FFFFFF", icon: Icons.Tidal, searchToPlay: true },
    { name: "Bandcamp", keys: ["bcsearch"], color: "#629AA9", icon: Icons.Bandcamp },
    { name: "Twitch", keys: ["twitch"], color: "#9146FF", icon: Icons.Twitch },
    { name: "Instagram", keys: ["instagram"], color: "#E1306C", icon: Icons.Instagram },
    { name: "Vimeo", keys: ["vimeo"], color: "#1AB7EA", icon: Icons.Vimeo },
    { name: "Reddit", keys: ["reddit"], color: "#FF4500", icon: Icons.Reddit },
    { name: "Bilibili", keys: ["bilibili"], color: "#00A1D6", icon: Icons.Bilibili },
    { name: "Last.fm", keys: ["lastfm"], color: "#D51007", icon: Icons.LastFm, searchToPlay: true },
    { name: "Pandora", keys: ["pdsearch"], color: "#005483", icon: Icons.Pandora, searchToPlay: true },
    { name: "Google TTS", keys: ["gtts"], color: "#4285F4", icon: MessageSquare },
    { name: "Flowery TTS", keys: ["flowery"], color: "#D15FEE", icon: Users },
    { name: "HTTP", keys: ["http"], color: "#2E8B57", icon: Radio },
    { name: "Kwai", keys: ["kwai"], color: "#FF8F00", icon: ListVideo },
    { name: "JioSaavn", keys: ["jssearch"], color: "#008A7C", icon: Zap },
    { name: "NicoVideo", keys: ["nicovideo"], color: "#333333", icon: ListVideo },
]

const lyricPlatforms = [
    { name: "Genius", keys: ["genius"], color: "#FFFF64", icon: Mic2 },
    { name: "Lrclib", keys: ["lrclib"], color: "#3B82F6", icon: FileText },
    { name: "Musixmatch", keys: ["musixmatch"], color: "#FF5300", icon: Music },
    { name: "YouTube", keys: ["youtube"], color: "#FF0000", icon: Icons.YouTube },
    { name: "Bilibili", keys: ["bilibili"], color: "#00A1D6", icon: Icons.Bilibili },
]

// --- Main Page ---
function FreeNodeLinkContent() {
    const [ads, setAds] = useState<Ad[]>([])
    const [bannerIndex] = useState<number>(0)
    const [searchQuery, setSearchQuery] = useState("")
    const [nodes, setNodes] = useState<NodeConfig[]>([])
    const [nodesLoading, setNodesLoading] = useState(true)
    const [nodesError, setNodesError] = useState<string | null>(null)
    const [visibleCount, setVisibleCount] = useState(9)
    const [nodeData, setNodeData] = useState<
        Map<string, { info: NodeInfo | null; stats: NodeStats | null; loading: boolean }>
    >(new Map())

    useEffect(() => {
        const fetchNodes = async () => {
            try {
                setNodesLoading(true)
                const res = await fetch("/api/nodes")
                if (!res.ok) throw new Error("Failed to fetch nodes")
                const data = await res.json()

                // Transform the data to match NodeConfig structure
                const transformedNodes: NodeConfig[] = Array.isArray(data)
                    ? data.map((node: any) => ({
                        title: node.title || node.name || "Unknown Node",
                        host: node.host,
                        port: String(node.port || "3000"),
                        password: node.password || "",
                        secure: node.secure || false,
                        sslHost: node.sslHost || node.ssl_host || undefined,
                        author: node.author
                            ? {
                                name: node.author.name || node.author,
                                website: node.author.website || node.author.url || undefined,
                            }
                            : undefined,
                    }))
                    : []

                setNodes(transformedNodes)
                setNodesError(null)
            } catch (error) {
                console.error("Error fetching nodes:", error)
                setNodesError("Failed to load nodes")
            } finally {
                setNodesLoading(false)
            }
        }
        fetchNodes()
    }, [])

    const filteredNodes = useMemo(() => {
        if (!searchQuery.trim()) return nodes
        const query = searchQuery.toLowerCase()
        return nodes.filter(
            (node) =>
                node.title.toLowerCase().includes(query) ||
                node.host.toLowerCase().includes(query) ||
                node.author?.name.toLowerCase().includes(query),
        )
    }, [searchQuery, nodes])

    // Reset visible count when search changes
    useEffect(() => {
        setVisibleCount(9)
    }, [searchQuery])

    const displayedNodes = useMemo(() => {
        return filteredNodes.slice(0, visibleCount)
    }, [filteredNodes, visibleCount])

    const fetchNodeData = useCallback(async (node: NodeConfig) => {
        setNodeData((prev) => {
            const newMap = new Map(prev)
            newMap.set(node.host, {
                info: prev.get(node.host)?.info || null,
                stats: prev.get(node.host)?.stats || null,
                loading: true,
            })
            return newMap
        })

        try {
            // Determine the base URL: prefer sslHost (https), fallback to standard host:port (http)
            const baseUrl = node.sslHost ? `https://${node.sslHost}` : `http://${node.host}:${node.port}`

            const apiUrl = `/api/nodelink?url=${encodeURIComponent(baseUrl)}&password=${encodeURIComponent(node.password)}`

            const res = await fetch(apiUrl)
            const data = await res.json()

            setNodeData((prev) => {
                const newMap = new Map(prev)
                newMap.set(node.host, {
                    info: data.info || null,
                    stats: data.stats || null,
                    loading: false,
                })
                return newMap
            })
        } catch (error) {
            console.error(`Failed to fetch data for ${node.host}:`, error)
            setNodeData((prev) => {
                const newMap = new Map(prev)
                newMap.set(node.host, { info: null, stats: null, loading: false })
                return newMap
            })
        }
    }, [])

    useEffect(() => {
        if (displayedNodes.length > 0) {
            displayedNodes.forEach((node) => {
                // Only fetch if we haven't fetched yet and aren't currently loading
                const currentData = nodeData.get(node.host)
                if (!currentData) {
                    fetchNodeData(node)
                }
            })
        }
    }, [displayedNodes, fetchNodeData, nodeData])

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const adsResponse = await fetch("https://nyxbot.app/api/slice")
                if (!adsResponse.ok) throw new Error("Failed to fetch ads")
                const rawAdsData = await adsResponse.json()
                let transformedAds: Ad[] = []
                if (Array.isArray(rawAdsData)) {
                    transformedAds = rawAdsData.map((ad: any) => ({
                        imageUrl: ad.image_url || "https://i.imgur.com/MGZIW89.png",
                        alt: ad.alt || "Invite NYX to your Discord server!",
                        linkUrl: ad.link_url || "https://shorturl.at/G3Cs3",
                        color: ad.color || "#FFFFFF",
                    }))
                }
                if (transformedAds.length === 0) {
                    transformedAds.push({
                        imageUrl: "https://i.imgur.com/MGZIW89.png",
                        alt: "Invite NYX to your Discord server!",
                        linkUrl: "https://shorturl.at/G3Cs3",
                        color: "#FFFFFF",
                    })
                }
                setAds(transformedAds)
            } catch (error) {
                console.error("Error fetching ads:", error)
            }
        }
        fetchAds()
    }, [])

    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        script.setAttribute("data-name", "BMC-Widget")
        script.setAttribute("data-cfasync", "false")
        script.setAttribute("data-id", "nyxaiproject")
        script.setAttribute("data-description", "Support me on Buy me a coffee!")
        script.setAttribute("data-color", "#06b6d4")
        script.setAttribute("data-position", "Right")
        script.setAttribute("data-x_margin", "18")
        script.setAttribute("data-y_margin", "18")
        script.async = true
        document.body.appendChild(script)

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script)
            }
            const widget = document.getElementById("bmc-wbtn")
            if (widget) widget.remove()
        }
    }, [])

    return (
        <main className="min-h-screen w-full relative bg-[#030305] text-stone-100 selection:bg-cyan-500/30 overflow-x-hidden font-sans">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/[0.015] rounded-full blur-[150px]" />
                <div className="absolute top-[50%] right-[-15%] w-[40%] h-[40%] bg-teal-500/[0.01] rounded-full blur-[120px]" />
                <div
                    className="absolute inset-0 opacity-[0.012]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(6,182,212,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,.2) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            {/* Hero Banner Image */}
            <div className="absolute top-0 left-0 right-0 h-[800px] z-[1] opacity-60 pointer-events-none select-none">
                <Image
                    src="/hero-banner.png"
                    alt="Hero Banner"
                    fill
                    className="object-cover object-top"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/80 to-[#030305]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
                {/* Hero - Simplified */}
                <div className="flex flex-col items-center text-center mb-16 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/50 border border-cyan-500/20 text-cyan-100 text-xs font-semibold uppercase tracking-wider"
                    >
                        <Sparkles className="w-3 h-3" />
                        <span>Free Public Audio Infrastructure</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400"
                    >
                        NodeLink
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/90 text-base md:text-lg max-w-lg mx-auto"
                    >
                        High-performance Lavalink nodes list.<br></br> Built for speed, stability, and quality for everyone.
                    </motion.p>
                </div>

                {/* Nodes Section */}
                <section className="mb-16">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg">
                                <Layers className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Live Nodes</h2>
                                <p className="text-xs text-stone-600">
                                    {nodesLoading ? "Loading..." : `${filteredNodes.length} nodes available`}
                                </p>
                            </div>
                        </div>

                        {/* Search input */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                            <input
                                type="text"
                                placeholder="Search nodes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-64 pl-9 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Loading state */}
                    {nodesLoading && (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                            <span className="ml-3 text-stone-500">Loading nodes...</span>
                        </div>
                    )}

                    {/* Error state */}
                    {nodesError && !nodesLoading && (
                        <div className="text-center py-12 text-stone-500">
                            <Signal className="w-8 h-8 mx-auto mb-3 opacity-50" />
                            <p>{nodesError}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/20 transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Nodes grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <AnimatePresence mode="popLayout">
                            {displayedNodes.map((node, index) => {
                                const data = nodeData.get(node.host)
                                return (
                                    <motion.div
                                        key={node.host}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <NodeCard
                                            config={node}
                                            info={data?.info || null}
                                            stats={data?.stats || null}
                                            loading={data?.loading ?? true}
                                            onRefresh={() => fetchNodeData(node)}
                                        />
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>


                    {/* Load More Button */}
                    {!nodesLoading && !nodesError && displayedNodes.length < filteredNodes.length && (
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => setVisibleCount((prev) => prev + 9)}
                                className="px-6 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-medium rounded-lg transition-all flex items-center gap-2 group border border-cyan-500/20 hover:border-cyan-500/40"
                            >
                                <span>Load More Nodes</span>
                                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    )}

                    {!nodesLoading && !nodesError && filteredNodes.length === 0 && nodes.length > 0 && (
                        <div className="text-center py-12 text-stone-600">
                            <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
                            <p>No nodes found matching "{searchQuery}"</p>
                        </div>
                    )}
                </section>

                {/* Sources & Lyrics - Compact */}
                <div className="space-y-12 mb-16">
                    {/* Supported Sources */}
                    <section>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                                <Radio className="w-4 h-4" />
                            </div>
                            <h2 className="text-lg font-bold text-white">Supported Sources</h2>
                            <span className="text-xs text-stone-600">{streamSources.length} platforms</span>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                            {streamSources.map((s) => (
                                <div
                                    key={s.name}
                                    className="group flex flex-col items-center gap-1.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-cyan-500/5 hover:border-cyan-500/20 transition-all"
                                    title={s.keys.join(", ")}
                                >
                                    <div className="p-1.5 rounded bg-white/5 text-white/70">
                                        <s.icon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-xs font-medium text-stone-400 truncate w-full text-center">{s.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Lyrics */}
                    <section>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                                <Mic2 className="w-4 h-4" />
                            </div>
                            <h2 className="text-lg font-bold text-white">Lyrics Sources</h2>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {lyricPlatforms.map((p) => (
                                <div
                                    key={p.name}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-rose-500/5 hover:border-rose-500/20 transition-all"
                                >
                                    <p.icon className="w-3.5 h-3.5 text-white/70" />
                                    <span className="text-xs font-medium text-stone-300">{p.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Features - Simplified grid */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Why NodeLink?</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            { title: "Lyrics Support", desc: "Synced lyrics from Bilibili & YouTube. Plain text from Genius, Musixmatch, and more.", icon: Mic2, color: "text-rose-400" },
                            { title: "Chapter Markers", desc: "Auto-load video chapters. Essential for podcasts and long mixes.", icon: ListVideo, color: "text-amber-400" },
                            { title: "Direct Streaming", desc: "Bypass Discord's pipes. Stream high-quality audio directly.", icon: Radio, color: "text-cyan-400" },
                            { title: "Audio Mixer", desc: "Real-time mixing engine. Overlay SFX, TTS, or voiceovers.", icon: Sliders, color: "text-violet-400" },
                            { title: "Text-to-Speech", desc: "Integrated Google TTS. No external API keys required.", icon: MessageSquare, color: "text-emerald-400" },
                            { title: "Global Network", desc: "Nodes deployed strategically for lowest latency.", icon: Globe, color: "text-blue-400" },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-all"
                            >
                                <feature.icon className={`w-5 h-5 ${feature.color} mb-2`} />
                                <h3 className="font-semibold text-white text-sm mb-0.5">{feature.title}</h3>
                                <p className="text-stone-600 text-xs">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recommendations - Compact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-16">
                    <Link
                        href="https://moonlink.js.org/"
                        target="_blank"
                        className="group p-5 rounded-xl bg-[#08080c] border border-white/[0.06] hover:border-cyan-500/30 transition-all"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Activity className="w-5 h-5 text-cyan-400" />
                            <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider">Recommended</span>
                        </div>
                        <h3 className="font-bold text-white mb-1">Moonlink.js</h3>
                        <p className="text-xs text-stone-500 mb-3">The ultimate client for NodeLink. Unlock Layout Mixing, auto-reconnect, and advanced filters.</p>
                        <span className="text-xs font-medium text-white flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                            Get Started <ArrowRight className="w-3 h-3" />
                        </span>
                    </Link>

                    <Link
                        href="https://nodelink.js.org/docs"
                        target="_blank"
                        className="group p-5 rounded-xl bg-[#08080c] border border-white/[0.06] hover:border-white/20 transition-all"
                    >
                        <ShieldCheck className="w-5 h-5 text-stone-500 mb-2" />
                        <h3 className="font-bold text-white mb-1">Self-Host</h3>
                        <p className="text-xs text-stone-500 mb-3">Prefer total control? Deploy your own private NodeLink instance with full documentation.</p>
                        <span className="text-xs font-medium text-white flex items-center gap-1 group-hover:text-stone-300 transition-colors">
                            Read Docs <ArrowRight className="w-3 h-3" />
                        </span>
                    </Link>

                    <Link
                        href="https://nyxbot.app/support"
                        target="_blank"
                        className="group p-5 rounded-xl bg-[#08080c] border border-white/[0.06] hover:border-violet-500/30 transition-all"
                    >
                        <Icons.Mix className="w-5 h-5 text-violet-400 mb-2" />
                        <h3 className="font-bold text-white mb-1">Host with Us</h3>
                        <p className="text-xs text-stone-500 mb-3">Have spare resources? Contribute to the community by hosting a public node.</p>
                        <span className="text-xs font-medium text-white flex items-center gap-1 group-hover:text-violet-400 transition-colors">
                            Contact Us <ArrowRight className="w-3 h-3" />
                        </span>
                    </Link>
                </div>

                {/* Ads Banner */}
                <AnimatePresence>
                    {ads.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12 rounded-xl overflow-hidden border border-white/[0.06] max-w-3xl mx-auto"
                        >
                            <Link href={ads[bannerIndex].linkUrl} target="_blank" rel="noopener noreferrer">
                                <div className="relative aspect-[21/6]">
                                    <Image
                                        src={ads[bannerIndex].imageUrl || "/placeholder.svg"}
                                        alt={ads[bannerIndex].alt}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-[9px] font-medium text-white/70">
                                        Sponsored
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <footer className="border-t border-white/[0.04] pt-8 pb-10 flex flex-col items-center gap-6 text-center">
                    <a href="https://www.buymeacoffee.com/nyxaiproject" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
                        <img
                            src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=nyxaiproject&button_colour=FFDD00&font_colour=000000&font_family=Arial&outline_colour=000000&coffee_colour=ffffff"
                            alt="Buy Me A Coffee"
                            className="h-10"
                        />
                    </a>
                    <p className="text-stone-400 text-md">
                        Need help with connection?{" "}
                        <a
                            href="https://nyxbot.app/support"
                            className="text-cyan-600 hover:text-cyan-400 font-medium transition-colors"
                        >
                            nyxbot.app/support
                        </a>
                    </p>
                </footer>
            </div>
        </main>
    )
}

export default function FreeNodeLinkPage() {
    return (
        <Suspense fallback={null}>
            <FreeNodeLinkContent />
        </Suspense>
    )
}