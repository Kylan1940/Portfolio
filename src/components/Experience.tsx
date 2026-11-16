import { experience } from "../lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionLabel";

export function Experience() {
    return (
        <section id="experience" className="section section-tint" aria-labelledby="experience-title">
            <div className="container">
                <SectionHeading id="experience" index="02" title="Experience" lead="Where I've built, broken, fixed and led — in the order it happened." />

                <ol className="timeline">
                    {experience.map((item) => (
                        <Reveal as="li" key={`${item.company}-${item.period}`} className="job">
                            <div className="job-when">
                                <p className="job-period">{item.period}</p>
                                <p className="job-duration">{item.duration}</p>
                            </div>
                            <div className="job-body">
                                <h3>{item.role}</h3>
                                <p className="job-company">{item.company}</p>
                                <div className="job-summary">
                                    {item.summary.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>
                                <ul className="job-highlights">
                                    {item.highlights.map((h) => (
                                        <li key={h}>{h}</li>
                                    ))}
                                </ul>
                                <ul className="tags" aria-label="Technologies and skills">
                                    {item.tags.map((tag) => (
                                        <li key={tag} className="tag">{tag}</li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
}
