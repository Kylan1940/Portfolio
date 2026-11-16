import { contact, NAV_LINKS, siteConfig } from "../lib/data";

export function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <p className="footer-name">{siteConfig.name}</p>
                    <p className="footer-tag">Developer, Minecraft builder and community lead, based in Semarang, Indonesia.</p>
                </div>

                <nav className="footer-col" aria-label="Footer sections">
                    <p className="footer-heading">Explore</p>
                    <ul>
                        {NAV_LINKS.map((l) => (
                            <li key={l.id}>
                                <a href={`#${l.id}`}>{l.label}</a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <nav className="footer-col" aria-label="Elsewhere">
                    <p className="footer-heading">Elsewhere</p>
                    <ul>
                        {contact.methods.map((m) => (
                            <li key={m.label}>
                                <a href={m.href} target={m.href.startsWith("mailto:") ? undefined : "_blank"} rel={m.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}>
                                    {m.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="container footer-bottom">
                <p>© {year} {siteConfig.name}</p>
                <a href="#hero">Back to top ↑</a>
            </div>
        </footer>
    );
}
