import { useRef, useState, type KeyboardEvent } from "react";
import { about } from "../lib/data";
import { ContributionGraph } from "./GitHubContributions";
import { Reveal } from "./Reveal";

export function About() {
    const [activeTab, setActiveTab] = useState(0);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const focus = about.currentFocus[activeTab];
    const count = about.currentFocus.length;

    function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
        let next: number;
        if (e.key === "ArrowRight") next = (index + 1) % count;
        else if (e.key === "ArrowLeft") next = (index - 1 + count) % count;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = count - 1;
        else return;
        e.preventDefault();
        setActiveTab(next);
        tabRefs.current[next]?.focus();
    }

    return (
        <section id="about" className="section" aria-labelledby="about-title">
            <div className="container">
                <Reveal as="header" className="section-heading about-heading">
                    <p className="section-index" aria-hidden="true">01</p>
                    <h2 id="about-title">
                        Hello, <span className="mark">World!</span>
                    </h2>
                </Reveal>

                <div className="about-grid">
                    <Reveal className="about-copy">
                        {about.paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </Reveal>

                    <Reveal as="dl" className="facts" delay={1}>
                        {about.intro.map((item) => (
                            <div key={item.label} className="fact">
                                <dt>{item.label}</dt>
                                <dd>{item.value}</dd>
                            </div>
                        ))}
                    </Reveal>
                </div>

                <Reveal className="focus" delay={1}>
                    <h3>Currently focused on</h3>
                    <div className="focus-layout">
                        <div className="tabs" role="tablist" aria-label="Current focus">
                            {about.currentFocus.map((item, i) => (
                                <button
                                    key={item.language}
                                    ref={(el) => {
                                        tabRefs.current[i] = el;
                                    }}
                                    id={`focus-tab-${i}`}
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === i}
                                    aria-controls="focus-panel"
                                    tabIndex={activeTab === i ? 0 : -1}
                                    className={`tab${activeTab === i ? " is-active" : ""}`}
                                    onClick={() => setActiveTab(i)}
                                    onKeyDown={(e) => onTabKeyDown(e, i)}
                                >
                                    {item.language}
                                </button>
                            ))}
                        </div>
                        <div id="focus-panel" className="focus-panel" role="tabpanel" aria-labelledby={`focus-tab-${activeTab}`} tabIndex={0}>
                            <p key={activeTab}>{focus.description}</p>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={1}>
                    <ContributionGraph />
                </Reveal>
            </div>
        </section>
    );
}
