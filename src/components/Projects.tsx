import { useMemo, useState } from "react";
import type { Project, ProjectStatus } from "../lib/database.types";
import { useApi } from "../lib/useApi";
import { Reveal } from "./Reveal";
import { SectionHeading, StateMessage } from "./SectionLabel";

const STATUS_ORDER: ProjectStatus[] = ["Live", "In Progress", "Planned", "Archived"];

const STATUS_CLASS: Record<ProjectStatus, string> = {
    Live: "is-live",
    "In Progress": "is-progress",
    Planned: "is-planned",
    Archived: "is-archived",
};

type StatusFilter = "All" | ProjectStatus;

function parseProjects(json: unknown): Project[] {
    const projects = (json as { projects?: unknown } | null)?.projects;
    if (!Array.isArray(projects)) {
        throw new Error("Unexpected response from the projects API");
    }
    return projects as Project[];
}

function ProjectCard({ project, featured, delay }: { project: Project; featured: boolean; delay: number }) {
    return (
        <Reveal as="article" className={`project${featured ? " is-featured" : ""}`} delay={delay}>
            <div className="project-top">
                <span className={`status ${STATUS_CLASS[project.status]}`}>{project.status}</span>
                {featured && <span className="badge">Featured</span>}
            </div>
            <h3>{project.name}</h3>
            <p className="project-desc">{project.description}</p>
            <ul className="tags" aria-label={`${project.name} tech stack`}>
                {project.stack.map((tech) => (
                    <li key={tech} className="tag">{tech}</li>
                ))}
            </ul>
            {(project.github || project.demo) && (
                <div className="project-links">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer noopener" aria-label={`${project.name} on GitHub (opens in a new tab)`}>
                            GitHub <span aria-hidden="true">↗</span>
                        </a>
                    )}
                    {project.demo && (
                        <a href={project.demo} target="_blank" rel="noreferrer noopener" aria-label={`${project.name} live demo (opens in a new tab)`}>
                            Demo <span aria-hidden="true">↗</span>
                        </a>
                    )}
                </div>
            )}
        </Reveal>
    );
}

export function Projects() {
    const { data, loading, error, reload } = useApi("/api/projects", parseProjects);
    const [status, setStatus] = useState<StatusFilter>("All");

    const projects = useMemo(() => data ?? [], [data]);

    // Statuses that actually exist in the data, in a sensible order, with counts.
    const filters = useMemo(() => {
        const counts = new Map<ProjectStatus, number>();
        for (const p of projects) counts.set(p.status, (counts.get(p.status) ?? 0) + 1);
        return STATUS_ORDER.filter((s) => counts.has(s)).map((s) => ({ status: s, count: counts.get(s) ?? 0 }));
    }, [projects]);

    // API order (sort_order, then newest) is preserved; the filter only narrows it.
    const visible = useMemo(() => (status === "All" ? projects : projects.filter((p) => p.status === status)), [projects, status]);

    return (
        <section id="projects" className="section section-tint" aria-labelledby="projects-title">
            <div className="container">
                <SectionHeading
                    id="projects"
                    index="04"
                    title="Projects"
                    lead="A mix of things I've shipped, maintained, or am still actively building. This list keeps growing as I build more."
                />

                {loading && (
                    <div className="project-grid" role="status" aria-label="Loading projects">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="project skeleton" aria-hidden="true" />
                        ))}
                    </div>
                )}

                {!loading && error && <StateMessage tone="error" title="Couldn't load projects." detail={error} onRetry={reload} />}

                {!loading && !error && projects.length === 0 && <StateMessage title="No projects found." detail="Check back soon — new work is on the way." />}

                {!loading && !error && projects.length > 0 && (
                    <>
                        {filters.length > 1 && (
                            <div className="chips project-filters" role="group" aria-label="Filter projects by status">
                                <button type="button" className={`chip${status === "All" ? " is-active" : ""}`} aria-pressed={status === "All"} onClick={() => setStatus("All")}>
                                    All <span className="chip-count">{projects.length}</span>
                                </button>
                                {filters.map((f) => (
                                    <button key={f.status} type="button" className={`chip${status === f.status ? " is-active" : ""}`} aria-pressed={status === f.status} onClick={() => setStatus(f.status)}>
                                        {f.status} <span className="chip-count">{f.count}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="project-grid">
                            {visible.map((project, i) => (
                                <ProjectCard key={project.id} project={project} featured={project.sort_order === 1} delay={Math.min(i, 4)} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
