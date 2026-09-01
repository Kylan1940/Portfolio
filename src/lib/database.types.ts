export type Database = {
    public: {
        Tables: {
            certificates: {
                Row: {
                    id: string;
                    title: string;
                    provider: string;
                    category: string;
                    issue_date: string | null;
                    certificate_url: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    title: string;
                    provider: string;
                    category: string;
                    issue_date?: string | null;
                    certificate_url?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    title?: string;
                    provider?: string;
                    category?: string;
                    issue_date?: string | null;
                    certificate_url?: string | null;
                    created_at?: string;
                };
            };

            projects: {
                Row: {
                    id: string;
                    name: string;
                    description: string;
                    stack: string[];
                    status:
                        | "Live"
                        | "In Progress"
                        | "Planned"
                        | "Archived";
                    github: string | null;
                    demo: string | null;
                    sort_order: number | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    description: string;
                    stack: string[];
                    status?:
                        | "Live"
                        | "In Progress"
                        | "Planned"
                        | "Archived";
                    github?: string | null;
                    demo?: string | null;
                    sort_order?: number | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    description?: string;
                    stack?: string[];
                    status?:
                        | "Live"
                        | "In Progress"
                        | "Planned"
                        | "Archived";
                    github?: string | null;
                    demo?: string | null;
                    sort_order?: number | null;
                    created_at?: string;
                };
            };
        };

        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
};

export type Certificate = Database["public"]["Tables"]["certificates"]["Row"];

export type Project = Database["public"]["Tables"]["projects"]["Row"];

export type ProjectStatus = Database["public"]["Tables"]["projects"]["Row"]["status"];

export const CERT_CATEGORIES = [
    "Mini Course",
    "Workshop",
    "Webinar",
] as const;

export type CertCategory = (typeof CERT_CATEGORIES)[number];

export type SortOrder = | "newest" | "oldest" | "title_asc" | "provider_asc";