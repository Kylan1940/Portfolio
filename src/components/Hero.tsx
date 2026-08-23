import { siteConfig } from "../lib/data";

export function Hero() {
    return (
        <section id="hero" className="hero min-h-screen w-full flex flex-col items-center justify-center px-6">
            <div className="mx-auto max-w-6xl text-center">
                <h1 className="reveal">{siteConfig.name}</h1>
                <p className="eyebrow reveal">
                    Also known as {siteConfig.username}
                    <span className="cursor" aria-hidden="true"></span>
                </p>
                <a
                    href="#about"
                    onClick={(e) => {
                        e.preventDefault();
                        document
                            .getElementById("about")
                            ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="cta reveal mt-6"
                >
                    What's there?
                    <svg viewBox="0 0 14 14" fill="none" xmlns="https://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M7 2v9M3 7.5 7 11l4-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </div>
        </section>
    );
}