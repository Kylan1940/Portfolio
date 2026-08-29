import { experience } from "../lib/data";

export function Experience() {
    return (
    <section id="experience" className="page-section">
        <div className="section-inner">
            <div className="timeline">
                {experience.map((item, i) => (
                    <article key={i} className="timeline-item">
                        {/* <div className="timeline-marker" aria-hidden="true"></div> */}
                        <div className="timeline-content">
                            <div className="timeline-header">
                                <div>
                                    <h3>{item.role}</h3>
                                    <p className="timeline-company">{item.company}</p>
                                </div>
                                <div className="timeline-period">
                                    <span>{item.period}</span>
                                    <span className="timeline-duration">{item.duration}</span>
                                </div>
                            </div>
                            <div className="timeline-summary space-y-3">
                                {item.summary.map((p, j) => (
                                    <p key={j} className="text-neutral-400 text-base leading-relaxed">{p}</p>
                                ))}
                            </div>
                            <ul className="timeline-highlights">
                                {item.highlights.map((h, j) => (
                                    <li key={j}>
                                        <span className="hightlights-strip" aria-hidden="true">-</span>
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="timeline-tags">
                                {item.tags.map((tag) => (
                                    <span key={tag} className="tag-pill">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>
  );
}