import { useEffect, useState } from "react";
import { siteConfig } from "../lib/data";

const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Certificates", href: "#certificates" },
    { label: "Contact", href: "#contact" },
]

export function Header() {
    const [visible, setVisible] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const hero = document.getElementById("hero")
        if (!hero) return

        const observer = new IntersectionObserver(
            ([entry]) => setVisible(!entry.isIntersecting),
            { threshold: 0, rootMargin: "-72px 0px 0px 0px" }
        )

        observer.observe(hero)
        return() => observer.disconnect()
    }, [])

    const menuOpenEffective = visible && menuOpen

    function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
        e.preventDefault()
        setMenuOpen(false)
        document.querySelector(href)?.scrollIntoView({behavior: "smooth"})
    }

    return (
        <header className={`header${visible ? " is-visible" : ""}`}>
            <a href="#hero" className="header-logo" onClick={(e) => handleLinkClick(e, "#hero")}>{siteConfig.username}</a>
            <nav className="header-links" aria-label="Section navigation">
                {NAV_LINKS.map((link) => (
                    <a key={link.href} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>{link.label}</a>
                ))}
            </nav>
            <button type="button" className="header-toggle" aria-label={menuOpenEffective ? "Close menu" : "Open menu"} aria-expanded={menuOpenEffective} onClick={() => setMenuOpen((v) => !v)}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {menuOpenEffective ? (
                        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    ) : (
                        <>
                            <path d="M4 7h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                            <path d="M4 12h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                            <path d="M4 17h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                        </>
                    )}
                </svg>
            </button>

            <nav className={`header-mobile-menu${menuOpenEffective ? " is-open" : ""}`} aria-label="Section navigation (mobile)">
                {NAV_LINKS.map((link) => (
                    <a key={link.href} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>{link.label}</a>
                ))}
            </nav>
        </header>
    )
}