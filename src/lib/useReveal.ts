import { useEffect, useRef } from "react";

/**
 * Adds `is-in` to the element the first time it scrolls into view.
 * The matching CSS only hides elements when the visitor has not asked for
 * reduced motion, so content is never stuck invisible.
 */
export function useReveal<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        if (typeof IntersectionObserver === "undefined") {
            element.classList.add("is-in");
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add("is-in");
                    observer.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return ref;
}
