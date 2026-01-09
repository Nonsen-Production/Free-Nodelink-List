export interface Ad {
  imageUrl: string
  alt: string
  linkUrl: string
  color: string
}

export interface NodeInfo {
  version: {
    semver: string
    major: number
    minor: number
    patch: number
    prerelease: string[]
    build: string[]
  }
  buildTime: number
  git: {
    branch: string
    commit: string
    commitTime: number
  }
  node: string
  voice: {
    name: string
    version: string
  }
  isNodelink: boolean
  sourceManagers: string[]
  filters: string[]
  plugins: string[]
}

export interface NodeStats {
  players: number
  playingPlayers: number
  uptime: number
  memory: {
    free: number
    used: number
    allocated: number
    reservable: number
  }
  cpu: {
    cores: number
    systemLoad: number
    nodelinkLoad: number
  }
  frameStats: {
    sent: number
    nulled: number
    deficit: number
    expected: number
  }
}

export interface NodeConfig {
  title: string
  host: string
  port: string
  password: string
  secure: boolean
  sslHost?: string
  author?: {
    name: string
    website?: string
  }
}
