import { siteConfig } from "../lib/data";

export function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-xs text-neutral-400 ml-15">{siteConfig.name}</p>
            <p className="text-xs text-neutral-300">{year}</p>
        </div>
        </footer>
    );
}
