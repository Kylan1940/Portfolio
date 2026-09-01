import { useEffect, useMemo, useState } from "react";
import type { Certificate, CertCategory, SortOrder } from "../lib/database.types";
import { CERT_CATEGORIES } from "../lib/database.types";

type FilterCategory = "All" | CertCategory;

const ALL_FILTER_CATEGORIES: FilterCategory[] = [
    "All",
    ...CERT_CATEGORIES,
];

const SORT_OPTIONS: {
    value: SortOrder;
    label: string;
}[] = [
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
    { value: "title_asc", label: "Title A → Z" },
    { value: "provider_asc", label: "Provider A → Z" },
];

function formatIssueDate(dateStr: string | null): string {
    if (!dateStr) return "none";

    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
    });
}

function sortCertificates(
    certificates: Certificate[],
    order: SortOrder
) {
    return [...certificates].sort((a, b) => {
        switch (order) {
            case "newest":
                return (
                    b.issue_date ?? b.created_at
                ).localeCompare(
                    a.issue_date ?? a.created_at
                );
            case "oldest":
                return (
                    a.issue_date ?? a.created_at
                ).localeCompare(
                    b.issue_date ?? b.created_at
                );
            case "title_asc":
                return a.title.localeCompare(b.title);
            case "provider_asc":
                return a.provider.localeCompare(b.provider);
            default:
                return 0;
        }
    });
}

function CertRow({cert}: {cert: Certificate;}) {
    const content = (
        <div className="cert-row">
            <div className="cert-row-main">
                <div className="cert-row-title">
                    <span>{cert.title}</span>
                    {cert.certificate_url && (
                        <span className="cert-row-arrow" aria-hidden="true">↗</span>
                    )}
                </div>
                <p className="cert-row-provider">{cert.provider}</p>
            </div>
            <div className="cert-row-meta">
                <span className="tag-pill">{cert.category}</span>
                <span className="cert-row-date">{formatIssueDate(cert.issue_date)}</span>
            </div>
        </div>
    );
    if (!cert.certificate_url) {
        return (
            <div className="cert-row-link is-static">{content}</div>
        );
    }
    return (
        <a href={cert.certificate_url} target="_blank" rel="noreferrer noopener" className="cert-row-link">{content}</a>
    );
}

export function Certificates() {
    const [certificates, setCertificates] = useState<
        Certificate[]
    >([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<FilterCategory>("All");
    const [provider, setProvider] = useState("All");
    const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

    useEffect(() => {
        let cancelled = false;
        async function loadCertificates() {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch("/api/certificates");
                if (!response.ok) {
                    throw new Error(
                        `Request failed with status ${response.status}`
                    );
                }
                const result = (await response.json()) as {
                    certificates: Certificate[];
                };
                if (!cancelled) {
                    setCertificates(result.certificates ?? []);
                }
            } catch (err) {
                console.error("Certificates loading error:", err);
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Failed to load certificates."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }
        loadCertificates();
        return () => {
            cancelled = true;
        };
    }, []);

    const allProviders = useMemo(() => {
        const providers = new Set(
            certificates.map(
                (certificate) => certificate.provider
            )
        );
        return ["All", ...Array.from(providers).sort()];
    }, [certificates]);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { All: certificates.length };
        for (const certificate of certificates) {
            counts[certificate.category] =
                (counts[certificate.category] ?? 0) + 1;
        }
        return counts;
    }, [certificates]);

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();

        const result = certificates.filter(
            (certificate) => {
                const matchesCategory = category === "All" || certificate.category === category;
                const matchesProvider = provider === "All" || certificate.provider === provider;
                const matchesSearch = query === "" ||
                    certificate.title.toLowerCase().includes(query) ||
                    certificate.provider.toLowerCase().includes(query) ||
                    certificate.category.toLowerCase().includes(query);
                return (
                    matchesCategory && matchesProvider && matchesSearch
                );
            }
        );

        return sortCertificates(result, sortOrder);
    }, [
        certificates,
        search,
        category,
        provider,
        sortOrder,
    ]);

    const hasActiveFilters =
        search.trim() !== "" ||
        category !== "All" ||
        provider !== "All";
    function clearFilters() {
        setSearch("");
        setCategory("All");
        setProvider("All");
        setSortOrder("newest");
    }

    return (
        <section id="certificates" className="page-section">
            <div className="section-inner">
                <div className="cert-controls">
                    <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by title, provider..." className="cert-input"/>
                    <select value={provider} onChange={(event) => setProvider(event.target.value)} className="cert-select">
                        {allProviders.map((item) => (
                            <option key={item} value={item}>
                                {item === "All" ? "All providers" : item}
                            </option>
                        ))}
                    </select>
                    <select value={sortOrder}  onChange={(event) => setSortOrder( event.target.value as SortOrder)} className="cert-select">
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <div className="focus-tabs cert-category-tabs">
                        {ALL_FILTER_CATEGORIES.map(
                            (item) => {
                                const count = categoryCounts[item] ?? 0;
                                const isActive = category === item;
                                return (
                                    <button key={item} type="button" className={`focus-tab${isActive ? " active" : ""}`} onClick={() => setCategory(item)}>{item}
                                        <span className="cert-category-count">{count}</span>
                                    </button>
                                );
                            }
                        )}
                    </div>
                </div>
                {loading ? (
                    <p className="cert-status">Loading certificates...</p>
                ) : error ? (
                    <div className="cert-status cert-status-error">
                        <p>Failed to load certificates.</p>
                        <span className="cert-status-detail">{error}</span>
                    </div>
                ) : filtered.length > 0 ? (
                    <div className="cert-list">
                        {filtered.map((certificate) => (
                            <CertRow key={certificate.id} cert={certificate} />
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
    );
}