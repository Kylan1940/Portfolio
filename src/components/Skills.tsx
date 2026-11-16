import { skills } from "../lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionLabel";

export function Skills() {
    return (
        <section id="skills" className="section" aria-labelledby="skills-title">
            <div className="container">
                <SectionHeading id="skills" index="03" title="Skills" lead="The tools I reach for, and the habits that come with them." />

                <div className="skills-grid">
                    {skills.map((group, i) => (
                        <Reveal key={group.title} as="article" className={`skill-card skill-card-${i % 3}`} delay={i}>
                            <h3>{group.title}</h3>
                            <ul>
                                {group.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
