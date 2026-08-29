import { skills } from "../lib/data";

export function Skills() {
    return (
    <section id="skills" className="page-section">
        <div className="section-inner">
            <div className="skills-grid">
                {skills.map((group) => (
                    <div key={group.title} className="skills-group">
                        <span className="skills-group-label">{group.title}</span>
                        <ul className="skills-list">
                            {group.items.map((item) => (
                                <li key={item}>
                                    <span className="hightlight-strip" aria-hidden="true">—</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}