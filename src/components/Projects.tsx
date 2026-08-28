import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Project, ProjectStatus } from "../lib/database.types";
import { projects as projectsData } from "../lib/data";

const SLIDE_DURATION = 5000
const PEEK_GAP = 20
const SWIPE_THRESHOLD = 40

const STATUS_CLASS: Record<ProjectStatus, string> = {
    Live: "is-live",
    "In Progress": "is-progess",
    Planned: "is-planned",
    Archived: "is-archived"
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="project-card">
            {project.featured && <span className="project-featured-badge">Featured</span>}

            <div className="project-card-header">
                <h3>{project.name}</h3>
            </div>

            <p className="project-card-desc">{project.description}</p>

            <div className="project-card-links">
                {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer noopener">
                        Github ↗
                    </a>
                )}
                {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer noopener">
                        Demo ↗
                    </a>
                )}
            </div>

            <div className="project-card-footer">
                <div className="project-card-stack">
                    {project.stack.map((t) => (
                        <span key={t} className="tag-pill">{t}</span>
                    ))}
                </div>
                <span className={`project-status ${STATUS_CLASS[project.status]}`}>{project.status}</span>
            </div>
        </div>
    )
}

function circularOffset (slideIndex: number, currentIndex: number, total: number) {
    let diff = slideIndex - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
}

export function Projects() {
    const featured = projectsData.filter((p) => p.featured)
    const rest = projectsData.filter((p) => !p.featured)
    const orderedProjects = [...featured, ...rest]
    const total = orderedProjects.length

    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)

    const goTo = useCallback(
        (next: number) => setIndex(((next % total) + total) % total), [total]
    )
    const goNext = useCallback(() => goTo(index + 1) , [goTo, index])
    const goPrev = useCallback(() => goTo(index - 1) , [goTo, index])

    const touchStartX = useRef<number | null>(null)
    const touchDeltaX = useRef(0)

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
        touchDeltaX.current = 0
        setPaused(true)
    }, [])

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if(touchStartX.current === null) return
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current
    }, [])

    const handleTouchEnd = useCallback(() => {
        if(Math.abs(touchDeltaX.current) > SWIPE_THRESHOLD) {
            if(touchDeltaX.current < 0) goNext()
            else goPrev()
        }
        touchStartX.current = null
        touchDeltaX.current = 0
        setPaused(false)
    }, [goNext, goPrev])

    useEffect(() => {
        if (paused || total <= 1) return

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % total)
        }, SLIDE_DURATION)

        return () => clearInterval(timer)
    }, [paused, total, index])

    return (
        <section id="projects" className="page-section">
            <div className="section-inner">
                <p className="text-neutral-400 text-base leading-relaxed max-w-md mb-8">
                    A mix of things I've shipped, maintained, or am still actively building. This list keeps growing as I build more.
                </p>
                <br />

                <div className="project-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                    <button type="button" className="slider-arrow slider-arrow-left" onClick={goPrev} aria-label="Previous project">
                        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M12.5 4.5 6.5 10l6 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className="project-viewport">
                        {orderedProjects.map((p, i) => {
                            const offset = circularOffset(i, index, total)
                            const distance = Math.abs(offset)
                            const isCenter = distance === 0
                            const visible = distance <= 1

                            return (
                                <div 
                                    key={p.id} 
                                    className={`project-slide-abs${isCenter ? " is-center" : ""}`}
                                    style={{
                                        transform: `translateX(calc(${offset * 100}% + ${offset * PEEK_GAP}px))`,
                                        opacity: visible ? (isCenter ? 1 : 0.4) : 0,
                                        filter: isCenter ? "none" : "blur(3px)",
                                        zIndex: 10 - distance,
                                        cursor: isCenter ? "default" : "pointer",
                                    }}
                                    onClick={!isCenter ? (offset < 0 ? goPrev : goNext) : undefined}
                                    aria-hidden= {!isCenter}
                                >
                                    <ProjectCard project={p} />
                                </div>
                            )
                        })}
                    </div>

                    <button type="button" className="slider-arrow slider-arrow-right" onClick={goNext} aria-label="Next project">
                        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M7.5 4.5 13.5 10l-6 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}