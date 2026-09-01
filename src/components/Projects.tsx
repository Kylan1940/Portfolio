import { useCallback, useEffect, useRef, useState } from "react";
import type { Project, ProjectStatus } from "../lib/database.types";

const SLIDE_DURATION = 5000;
const FIRST_ADVANCE_DELAY = 500;
const PEEK_GAP = 20;
const SWIPE_THRESHOLD = 40;

const STATUS_CLASS: Record<ProjectStatus, string> = {
    Live: "is-live",
    "In Progress": "is-progress",
    Planned: "is-planned",
    Archived: "is-archived",
};

function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="project-card">
            <div className="project-card-header">
                <div>
                    <h3>{project.name}</h3>
                </div>
                {project.sort_order === 1 && (
                        <span className="project-featured-badge">Featured</span>
                )}
            </div>
            <p className="project-card-desc">{project.description}</p>
            <div className="project-card-links">
                {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer noopener">Github ↗</a>
                )}
                {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer noopener">Demo ↗</a>
                )}
            </div>
            <div className="project-card-footer">
                <div className="project-card-stack">
                    {project.stack.map((technology) => (
                        <span key={technology} className="tag-pill">{technology}</span>
                    ))}
                </div>
                <span className={`project-status ${ STATUS_CLASS[project.status]}`}>{project.status}</span>
            </div>
        </div>
    );
}

function circularOffset(
    slideIndex: number,
    currentIndex: number,
    total: number
) {
    let diff = slideIndex - currentIndex;
    if (diff > total / 2) {
        diff -= total;
    }
    if (diff < -total / 2) {
        diff += total;
    }
    return diff;
}

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [inView, setInView] = useState(false);
    const [readyToAdvance, setReadyToAdvance] = useState(false);

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadProjects() {
            try {
                const response = await fetch("/api/projects");

                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }

                const result = (await response.json()) as {
                    projects: Project[];
                };

                if (!cancelled) {
                    setProjects(result.projects);
                }
            } catch (error) {
                console.error("Projects loading error:", error);
                if (!cancelled) {
                    setProjects([]);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadProjects();
        return () => {
            cancelled = true;
        };
    }, []);

    const total = projects.length;

    const goTo = useCallback(
        (next: number) => {
            if (total === 0) return;
            setIndex(((next % total) + total) % total);
        },
        [total]
    );

    const goNext = useCallback(() => {
        goTo(index + 1);
    }, [goTo, index]);

    const goPrev = useCallback(() => {
        goTo(index - 1);
    }, [goTo, index]);

    const touchStartX = useRef<number | null>(null);
    const touchDeltaX = useRef(0);

    const handleTouchStart = (event: React.TouchEvent) => {
        touchStartX.current = event.touches[0].clientX;
        touchDeltaX.current = 0;
        setPaused(true);
    };

    const handleTouchMove = ( event: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        touchDeltaX.current = event.touches[0].clientX - touchStartX.current;
    };
    const handleTouchEnd = () => {
        if (Math.abs(touchDeltaX.current) > SWIPE_THRESHOLD) {
            if (touchDeltaX.current < 0) {
                goNext();
            } else {
                goPrev();
            }
        }
        touchStartX.current = null;
        touchDeltaX.current = 0;
        setPaused(false);
    };

    useEffect(() => {
        const element = sliderRef.current;
        if (!element) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (enterTimeoutRef.current) {
                    clearTimeout(enterTimeoutRef.current);
                }
                if (entry.isIntersecting) {
                    setInView(true);
                    setIndex(0);
                    setReadyToAdvance(false);
                    enterTimeoutRef.current = setTimeout(() => {setReadyToAdvance(true)}, FIRST_ADVANCE_DELAY);
                } else {
                    setInView(false);
                    setReadyToAdvance(false);
                }
            },
            { threshold: 0.4 }
        );
        observer.observe(element);
        return () => {
            observer.disconnect();
            if (enterTimeoutRef.current) {
                clearTimeout(enterTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if ( paused || !inView || !readyToAdvance || total <= 1 ) {
            return;
        }
        const timer = setInterval(() => {
            setIndex((previous) => (previous + 1) % total);
        }, SLIDE_DURATION);

        return () => clearInterval(timer);
    }, [
        paused,
        inView,
        readyToAdvance,
        total,
    ]);

    return (
        <section id="projects" className="page-section" ref={sliderRef}>
            <div className="section-inner">
                <p className="text-neutral-400 text-base leading-relaxed max-w-md mb-8">
                    A mix of things I've shipped, maintained, or am still actively building. This list keeps growing as I build more.
                </p>
                {loading ? (
                    <p className="cert-status">Loading projects...</p>
                ) : total === 0 ? (
                    <p className="cert-status">No projects found.</p>
                ) : (
                    <>
                        <div className="project-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                            <button type="button" className="slider-arrow slider-arrow-left" onClick={goPrev} aria-label="Previous project">
                                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path d="M12.5 4.5 6.5 10l6 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <div className="project-viewport">
                                {projects.map((project, i) => {
                                    const offset = circularOffset( i, index, total);
                                    const distance = Math.abs(offset);
                                    const isCenter = distance === 0;
                                    const visible = distance <= 1;
                                    return (
                                        <div key={project.id} className={`project-slide-abs${isCenter ? " is-center" : ""}`}
                                            style={{transform: `translateX(calc(${offset * 100}% + ${offset * PEEK_GAP}px))`,
                                                opacity: visible ? isCenter ? 1 : 0.4 : 0,
                                                filter: isCenter ? "none" : "blur(3px)",
                                                zIndex: 10 - distance,
                                                cursor: isCenter ? "default" : "pointer",
                                            }}
                                            onClick={!isCenter ? offset < 0 ? goPrev: goNext : undefined}
                                            aria-hidden={!isCenter}
                                        >
                                            <ProjectCard project={project}/>
                                        </div>
                                    );
                                })}
                            </div>
                            <button type="button" className="slider-arrow slider-arrow-right" onClick={goNext} aria-label="Next project">
                                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path d="M7.5 4.5 13.5 10l-6 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <span className="slider-counter">{index + 1} / {total}</span>
                    </>
                )}
            </div>
        </section>
    );
}