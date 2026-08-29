import { contact } from "../lib/data";

export function Contact() {
    return (
    <section id="contact" className="page-section">
        <div className="section-inner">
            {/* <h2>Contact</h2> */}
            <p className="text-neutral-400 text-base leading-relaxed max-w-md mb-8">{contact.intro}</p>
            <div className="contact-list">
                {contact.methods.map((m) => {
                    const isExternal = !m.href.startsWith('mailto:')
                    return (
                        <a key={m.label} href={m.href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer noopener' : undefined} className="contact-row">
                            <div className="contact-row-main">
                                <span className="contact-label">{m.label}</span>
                                <span className="contact-value">{m.value}</span>
                                <span className="contact-hint">{m.hint}</span>
                            </div>
                            <span className="contact-arrow" aria-hidden="true">↗</span>
                        </a>
                    )
                })}
            </div>
        </div>
    </section>
  );
}