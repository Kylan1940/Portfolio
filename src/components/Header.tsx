import { useEffect, useState } from "react";
import { NAV_LINKS, siteConfig } from "../lib/data";

export function Header() {
    // Hidden while the Hero is on screen, shown as soon as the visitor leaves it.
    const [visible, setVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const hero = document.getElementById("hero");
        if (!hero) return;
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(!entry.isIntersecting),
            { threshold: 0, rootMargin: "-96px 0px 0px 0px" }
        );
        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => el !== null);
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActive(entry.target.id);
                }
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [menuOpen]);

    const menuOpenEffective = visible && menuOpen;

    return (
        <header className={`header${visible ? " is-visible" : ""}`} inert={!visible}>
            <div className="header-bar">
                <a href="#hero" className="header-logo" onClick={() => setMenuOpen(false)}>
                    {siteConfig.username}
                </a>

                <nav className="header-links" aria-label="Sections">
                    {NAV_LINKS.map((link) => (
                        <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? "true" : undefined}>
                            {link.label}
                        </a>
                    ))}
                </nav>

                <button
                    type="button"
                    className="header-toggle"
                    aria-label={menuOpenEffective ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpenEffective}
                    aria-controls="mobile-menu"
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        {menuOpenEffective ? (
                            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        ) : (
                            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        )}
                    </svg>
                </button>
            </div>

            <nav id="mobile-menu" className={`header-mobile${menuOpenEffective ? " is-open" : ""}`} aria-label="Sections (mobile)" inert={!menuOpenEffective}>
                {NAV_LINKS.map((link) => (
                    <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? "true" : undefined} onClick={() => setMenuOpen(false)}>
                        {link.label}
                    </a>
                ))}
            </nav>
        </header>
    );
}
