import { useState } from 'react';
import { about } from '../lib/data'
import { ContributionGraph } from "./GitHubContributions";

export function About() {
    const [activeTab, setActiveTab] = useState(0)
    const focus = about.currentFocus[activeTab]

    return (
    <section id="about" className="page-section">
        <div className="section-inner">

            <p className="hello-world">Hello, World!</p>

            <div className="space-y-4">
                {about.paragraphs.map((p, i) => (
                    <p key={i} className='text-neutral-400 text-base leading-relaxed'>{p}</p>
                ))}
            </div>

            <dl className="intro-grid">
                {about.intro.map((item) => (
                    <div key={item.label} className="intro-row">
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                    </div>
                ))}
            </dl>

            <div className="focus-block">
                <h2>Currently focused on:</h2>
                <div className="focus-tabs" role='tablist' aria-label="Currentlu focused on">
                    {about.currentFocus.map((item, i) => (
                        <button
                            key={item.language}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === i}
                            className={`focus-tab${activeTab === i ? ' active' : ''}`}
                            onClick={() => setActiveTab(i)}
                        >
                            {item.language}
                        </button>
                    ))}
                </div>
                <div className="focus-panel" role="tabpanel">
                    <p>{focus.description}</p>
                </div>
            </div>
            <ContributionGraph />

        </div>
    </section>
  );
}