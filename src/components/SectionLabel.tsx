import { Reveal } from "./Reveal";

type SectionHeadingProps = {
    id: string;
    index: string;
    title: string;
    lead?: string;
};

/** Shared heading for every main section: number, title and optional lead text. */
export function SectionHeading({ id, index, title, lead }: SectionHeadingProps) {
    return (
        <Reveal as="header" className="section-heading">
            <p className="section-index" aria-hidden="true">{index}</p>
            <h2 id={`${id}-title`}>{title}</h2>
            {lead && <p className="section-lead">{lead}</p>}
        </Reveal>
    );
}

type StateMessageProps = {
    tone?: "neutral" | "error";
    title: string;
    detail?: string;
    onRetry?: () => void;
};

/** Shared loading / empty / error message used by every data-driven section. */
export function StateMessage({ tone = "neutral", title, detail, onRetry }: StateMessageProps) {
    return (
        <div className={`state-message is-${tone}`} role={tone === "error" ? "alert" : "status"}>
            <p className="state-title">{title}</p>
            {detail && <p className="state-detail">{detail}</p>}
            {onRetry && (
                <button type="button" className="btn btn-ghost" onClick={onRetry}>
                    Try again
                </button>
            )}
        </div>
    );
}
