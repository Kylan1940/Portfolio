import React, { useEffect, useState } from "react";
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

        const observer = new IntersectionObserver (
            ([entry]) => setVisible(!entry.isIntersecting),
            { threshold: 0, rootMargin: "-72px 0px 0px 0px"}
        )
        observer.observe(hero)
        return () => observer.disconnect()
    }, [])

    const menuOpenEffective = visible && menuOpen
    function handleLinkclick (e: React.MouseEvent<HTMLAnchorElement>, href: string) {
        e.preventDefault()
        setMenuOpen(false)
        document.querySelector(href)?.scrollIntoView({behavior: "smooth"})
    }

    return (
        <header className={`navbar${visible ? " is-visible" : ""}`}>
             <div className="navbar-inner">
                <a href="#hero" className="navbar-logo">{siteConfig.username}</a>
                <nav className="navbar-links" aria-label="Section navigation">
                    {NAV_LINKS.map((link) => (
                        <a key={link.href} href={link.href} onClick={(e) => handleLinkclick(e, link.href)}>{link.label}</a>
                    ))}
                </nav>
                <button type="button" className="navbar-toggle" aria-label={menuOpenEffective ? "Close menu" : "Open menu"}>{menuOpenEffective ? "✕" : "☰"}</button>
             </div>
             <nav className={`navbar-mobile-menu${menuOpenEffective ? " is-open" : ""}`} aria-label="Section navigation (mobile)">
                {NAV_LINKS.map((link) => (
                    <a key={link.href} href={link.href} onClick={(e) => handleLinkclick(e, link.href)}>{link.label}</a>
                ))}
             </nav>
        </header>
    )
}