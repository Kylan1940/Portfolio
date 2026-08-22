import { siteConfig } from "../lib/data";

export function Hero() {
    return (
        <section id="hero" className="min-h-screen w-full flex flex-col items-center justify-center px-6">
            <div className="mx-auto max-w-6xl text-center">
                <h1>{siteConfig.name}</h1>
                <p>Also known as {siteConfig.username}</p>
                <a
                    href="#about"
                    onClick={(e) => {
                        e.preventDefault();
                        document
                            .getElementById("about")
                            ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-6 inline-block rounded-lg bg-(--text-h) px-7 py-3 font-medium text-(--bg) transition hover:opacity-80"
                >
                    Lihat Selengkapnya
                </a>
            </div>
        </section>
    );
}