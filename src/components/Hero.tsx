import { siteConfig } from "../lib/data";

const SIZE = 1200;
const CENTER = SIZE / 2;

/** Builds one closed, smooth, slightly irregular contour ring (like a topographic map line). */
function contourPath(radius: number, seed: number): string {
    const points = 64;
    const coords: [number, number][] = [];
    for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const wobble =
            1 +
            0.07 * Math.sin(angle * 3 + seed) +
            0.045 * Math.sin(angle * 5 - seed * 1.7) +
            0.025 * Math.sin(angle * 9 + seed * 0.6);
        coords.push([CENTER + Math.cos(angle) * radius * wobble, CENTER + Math.sin(angle) * radius * wobble * 0.82]);
    }
    const mid = (a: [number, number], b: [number, number]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const start = mid(coords[points - 1], coords[0]);
    let d = `M${start[0].toFixed(1)} ${start[1].toFixed(1)}`;
    for (let i = 0; i < points; i++) {
        const next = mid(coords[i], coords[(i + 1) % points]);
        d += `Q${coords[i][0].toFixed(1)} ${coords[i][1].toFixed(1)} ${next[0].toFixed(1)} ${next[1].toFixed(1)}`;
    }
    return d + "Z";
}

// Computed once at module load, so rendering the Hero stays cheap.
const CONTOURS = Array.from({ length: 13 }, (_, i) => contourPath(70 + i * 46, 0.9 + i * 0.16));

export function Hero() {
    const [first, ...rest] = siteConfig.name.split(" ");

    return (
        <section id="hero" className="hero" aria-label="Introduction">
            <svg className="hero-contours" viewBox={`0 0 ${SIZE} ${SIZE}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
                {CONTOURS.map((d, i) => (
                    <path key={i} d={d} className={i % 4 === 0 ? "is-major" : undefined} />
                ))}
            </svg>
            <span className="hero-sun" aria-hidden="true" />

            <div className="hero-inner">

                <h1 className="hero-name">
                    <span className="hero-in" style={{ "--i": 1 } as React.CSSProperties}>{first}</span>
                    <span className="hero-in" style={{ "--i": 2 } as React.CSSProperties}>
                        <em className="hero-mark">{rest[0]}</em> {rest.slice(1).join(" ")}
                    </span>
                </h1>

                <p className="hero-aka hero-in" style={{ "--i": 3 } as React.CSSProperties}>
                    Also known as <strong>{siteConfig.username}</strong>
                    <span className="hero-cursor" aria-hidden="true" />
                </p>

                <a href="#about" className="btn btn-primary hero-cta hero-in" style={{ "--i": 4 } as React.CSSProperties}>
                    What's Inside?
                    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M7 2v9M3 7.5 7 11l4-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </div>
        </section>
    );
}
