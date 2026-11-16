import { useMemo, useState } from "react";
import type { Certificate, CertCategory, SortOrder } from "../lib/database.types";
import { CERT_CATEGORIES } from "../lib/database.types";
import { certificatesDriveUrl } from "../lib/data";
import { useApi } from "../lib/useApi";
import { Reveal } from "./Reveal";
import { SectionHeading, StateMessage } from "./SectionLabel";

type FilterCategory = "All" | CertCategory;

const ALL_FILTER_CATEGORIES: FilterCategory[] = ["All", ...CERT_CATEGORIES];

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
    { value: "title_asc", label: "Title A → Z" },
    { value: "provider_asc", label: "Provider A → Z" },
];

function parseCertificates(json: unknown): Certificate[] {
    const certificates = (json as { certificates?: unknown } | null)?.certificates;
    if (!Array.isArray(certificates)) {
        throw new Error("Unexpected response from the certificates API");
    }
    return certificates as Certificate[];
}

function formatIssueDate(dateStr: string | null): string {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", timeZone: "UTC" });
}

function sortCertificates(certificates: Certificate[], order: SortOrder) {
    return [...certificates].sort((a, b) => {
        switch (order) {
            case "newest":
                return (b.issue_date ?? b.created_at).localeCompare(a.issue_date ?? a.created_at);
            case "oldest":
                return (a.issue_date ?? a.created_at).localeCompare(b.issue_date ?? b.created_at);
            case "title_asc":
                return a.title.localeCompare(b.title);
            case "provider_asc":
                return a.provider.localeCompare(b.provider);
            default:
                return 0;
        }
    });
}

function CertRow({ cert }: { cert: Certificate }) {
    const content = (
        <>
            <span className="cert-main">
                <span className="cert-title">
                    {cert.title}
                    {cert.certificate_url && <span className="cert-arrow" aria-hidden="true"> ↗</span>}
                </span>
                <span className="cert-provider">{cert.provider}</span>
            </span>
            <span className="cert-meta">
                <span className="tag">{cert.category}</span>
                <span className="cert-date">{formatIssueDate(cert.issue_date)}</span>
            </span>
        </>
    );

    if (!cert.certificate_url) {
        return <li className="cert is-static">{content}</li>;
    }
    return (
        <li>
            <a className="cert" href={cert.certificate_url} target="_blank" rel="noreferrer noopener">
                {content}
                <span className="sr-only"> (opens in a new tab)</span>
            </a>
        </li>
    );
}

export function Certificates() {
    const { data, loading, error, reload } = useApi("/api/certificates", parseCertificates);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<FilterCategory>("All");
    const [provider, setProvider] = useState("All");
    const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

    const certificates = useMemo(() => data ?? [], [data]);

    const allProviders = useMemo(() => ["All", ...Array.from(new Set(certificates.map((c) => c.provider))).sort()], [certificates]);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { All: certificates.length };
        for (const c of certificates) counts[c.category] = (counts[c.category] ?? 0) + 1;
        return counts;
    }, [certificates]);

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        const result = certificates.filter((c) => {
            const matchesCategory = category === "All" || c.category === category;
            const matchesProvider = provider === "All" || c.provider === provider;
            const matchesSearch =
                query === "" ||
                c.title.toLowerCase().includes(query) ||
                c.provider.toLowerCase().includes(query) ||
                c.category.toLowerCase().includes(query);
            return matchesCategory && matchesProvider && matchesSearch;
        });
        return sortCertificates(result, sortOrder);
    }, [certificates, search, category, provider, sortOrder]);

    const hasActiveFilters = search.trim() !== "" || category !== "All" || provider !== "All";

    function clearFilters() {
        setSearch("");
        setCategory("All");
        setProvider("All");
        setSortOrder("newest");
    }

    return (
        <section id="certificates" className="section" aria-labelledby="certificates-title">
            <div className="container">
                <SectionHeading id="certificates" index="05" title="Certificates" lead="Courses, trainings and workshops I've completed along the way." />

                <Reveal className="cert-controls">
                    <div className="cert-fields">
                        <label className="field field-grow">
                            <span className="sr-only">Search certificates</span>
                            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or provider…" />
                        </label>
                        <label className="field">
                            <span className="sr-only">Filter by provider</span>
                            <select value={provider} onChange={(e) => setProvider(e.target.value)}>
                                {allProviders.map((item) => (
                                    <option key={item} value={item}>
                                        {item === "All" ? "All providers" : item}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="field">
                            <span className="sr-only">Sort certificates</span>
                            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as SortOrder)}>
                                {SORT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="chips" role="group" aria-label="Filter certificates by category">
                        {ALL_FILTER_CATEGORIES.map((item) => (
                            <button key={item} type="button" className={`chip${category === item ? " is-active" : ""}`} aria-pressed={category === item} onClick={() => setCategory(item)}>
                                {item} <span className="chip-count">{categoryCounts[item] ?? 0}</span>
                            </button>
                        ))}
                    </div>
                </Reveal>

                {loading && (
                    <div className="cert-list" role="status" aria-label="Loading certificates">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="cert skeleton" aria-hidden="true" />
                        ))}
                    </div>
                )}

                {!loading && error && <StateMessage tone="error" title="Couldn't load certificates." detail={error} onRetry={reload} />}

                {!loading && !error && filtered.length > 0 && (
                    <>
                        <p className="cert-count" aria-live="polite">
                            Showing {filtered.length} of {certificates.length}
                        </p>
                        <ul className="cert-list">
                            {filtered.map((c) => (
                                <CertRow key={c.id} cert={c} />
                            ))}
                        </ul>
                    </>
                )}

                {!loading && !error && filtered.length === 0 && (
                    <StateMessage title={hasActiveFilters ? "No certificates match your search or filter." : "No certificates found."} />
                )}

                <div className="cert-actions">
                    <a href={certificatesDriveUrl} target="_blank" rel="noreferrer noopener" className="btn btn-ghost">
                        View on Google Drive <span aria-hidden="true">↗</span>
                    </a>
                    {hasActiveFilters && (
                        <button type="button" className="btn btn-text" onClick={clearFilters}>
                            Clear filters
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
