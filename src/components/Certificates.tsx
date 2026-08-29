import { useMemo, useState } from "react";
import type { Certificate, CertCategory, SortOrder } from "../lib/database.types";
import { CERT_CATEGORIES } from "../lib/database.types";
import { certificates as certificatesData } from "../lib/data";

type FilterCategory = "All" | CertCategory

const ALL_FILTER_CATEGORIES: FilterCategory[] = ["All", ...CERT_CATEGORIES]

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
    { value: "title_asc", label: "Title A → Z" },
    { value: "provider_asc", label: "Provider A → Z" },
]

function formatIssueDate(dateStr: string | null): string {
    if(!dateStr) return "none"
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short"})
}

function sortCertificates(certs: Certificate[], order: SortOrder): Certificate[] {
    return [...certs].sort((a,b) => {
        switch (order) {
            case "newest":
                return (b.issue_date ?? b.created_at).localeCompare(a.issue_date ?? a.created_at)
            case "oldest":
                return (a.issue_date ?? a.created_at).localeCompare(b.issue_date ?? b.created_at)
            case "title_asc":
                return a.title.localeCompare(b.title)
            case "provider_asc":
                return a.provider.localeCompare(b.provider)
            default:
                return 0
        }
    })
}

function CertRow({ cert }: { cert: Certificate }) {
    // const hasLink = Boolean(cert.certificate_url)

    const inner = (
        <div className="cert-row">
            <div className="cert-row-main">
                <div className="cert-row-title">
                    <span>{cert.title}</span>
                </div>
                <p className="cert-row-provider">{cert.provider}</p>
            </div>

            <div className="cert-row-meta">
                <span className="tag-pill">{cert.category}</span>
                <span className="cert-row-date">{formatIssueDate(cert.issue_date)}</span>
            </div>
        </div>
    )

    return <div className="cert-rowlink is-static">{inner}</div>
}

export function Certificates() {
    // const [certificates, setCertificates] = useState<Certificate[]>([])
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState<string | null>(null)

    // useEffect(() => {
    //     let cancelled = false

    //     try {
    //         const supabase = createBrowserClient()
    //         supabase
    //         .from("certificates")
    //         .select("*")
    //         .order("created_at", {ascending: false})
    //         .then(({data, error: fetchError}) => {
    //             if (cancelled) return
    //             if (fetchError) setError(fetchError.message)
    //             else setCertificates((data ?? []) as Certificate[])
    //             setLoading(false)
    //         })
    //     } catch (err) {
    //         queueMicrotask(() => {
    //             if(!cancelled) {
    //                 setError(err instanceof Error ? err.message : "Failed to load certificates.")
    //                 setLoading(false)
    //             }
    //         })
    //     }

    //     return () => { cancelled: true }
    // }, [])

    const certificates = certificatesData

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState<FilterCategory>("All")
    const [provider, setProvider] = useState("All")
    const [sortOrder, setSortOrder] = useState<SortOrder>("newest")

    const allProviders = useMemo(() => {
        const set = new Set(certificates.map((c) => c.provider))
        return ["All", ...Array.from(set).sort()]
    }, [certificates])

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {All: certificates.length}
        for (const cert of certificates) {
            counts[cert.category] = (counts[cert.category] ?? 0) + 1
        }
        return counts
    }, [certificates])

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()

        const result = certificates.filter((cert) => {
            const matchesCategory = category === "All" || cert.category === category
            const matchesProvider = provider === "All" || cert.provider === provider
            const matchesSearch = q === "" || cert.title.toLowerCase().includes(q) || cert.provider.toLowerCase().includes(q) || cert.category.toLowerCase().includes(q)
            return matchesCategory && matchesProvider && matchesSearch
        })
        return sortCertificates(result, sortOrder)
    }, [certificates, search, category, provider, sortOrder])

    const hasActiveFilters =search.trim() !== "" || category !== "All" || provider !== "All"

    function clearFilters() {
        setSearch("")
        setCategory("All")
        setProvider("All")
        setSortOrder("newest")
    }

    return (
        <section id="certificates" className="page-section">
            <div className="section-inner">
                {/* <p className="text-neutral-400 text-base leading-relaxed max-w-md mb-8">Certificates</p> */}
                <div className="cert-controls">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title, provider..." className="cert-input" />
                    <select value={provider} onChange={(e) => setProvider(e.target.value)} className="cert-select">
                        {allProviders.map((p) => (
                            <option key={p} value={p}>{p === "All" ? "All providers" : p}</option>
                        ))}
                    </select>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as SortOrder)} className="cert-select">
                        {SORT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <div className="focus-tabs cert-category-tabs">
                        {ALL_FILTER_CATEGORIES.map((cat) => {
                            const count = categoryCounts[cat] ?? 0
                            const isActive = category === cat
                            return (
                                <button key={cat} type="button" className={`focus-tab${isActive ? " active" : ""}`} onClick={() => setCategory(cat)}>
                                    {cat}
                                    <span className="cert-category-count">{count}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
                {filtered.length > 0 ? (
                    <div className="cert-list">
                        {filtered.map((cert) => (
                            <CertRow key={cert.id} cert={cert} />
                        ))}
                    </div>
                ) : (
                    <p className="cert-status">
                        {hasActiveFilters ? "No certificates match your search or filter." : "No certificates found."}
                    </p>
                )}

                <div className="cert-footer">
                    <span className="cert-footer-count">
                        {filtered.length === certificates.length ? `${certificates.length} certificates` : `${filtered.length} of ${certificates.length} certificates`}
                    </span>
                    {hasActiveFilters && (
                        <button type="button" className="cert-clear" onClick={clearFilters}>Clear Filters</button>
                    )}
                </div>
            </div>
        </section>
    )
}