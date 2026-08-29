export const CERT_CATEGORIES = [
    "Mini Course",
    "Workshop",
    "Webinar"
] as const

export type CertCategory = (typeof CERT_CATEGORIES)[number]
export type SortOrder = "newest" | "oldest" | "title_asc" | "provider_asc"

export interface Certificate {
    id: string
    title: string
    provider: string
    category: CertCategory
    issue_date: string | null
    created_at: string
}

export type ProjectStatus = "Live" | "In Progress" | "Planned" | "Archived"

export interface Project {
    id: string
    name: string
    description: string
    stack: string[]
    github: string | null
    demo: string | null
    status: ProjectStatus
    featured?: boolean
}