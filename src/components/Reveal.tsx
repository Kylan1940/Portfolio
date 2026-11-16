import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "../lib/useReveal";

type RevealProps = {
    as?: ElementType;
    delay?: number;
    className?: string;
    children: ReactNode;
};

export function Reveal({ as: Tag = "div", delay = 0, className = "", children }: RevealProps) {
    const ref = useReveal<HTMLElement>();
    const style = { "--d": `${delay * 80}ms` } as CSSProperties;
    return (
        <Tag ref={ref} className={`reveal ${className}`.trim()} style={style}>
            {children}
        </Tag>
    );
}
