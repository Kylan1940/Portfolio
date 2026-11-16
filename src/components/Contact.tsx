import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import { contact } from "../lib/data";
import { useReveal } from "../lib/useReveal";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionLabel";

type Status = "idle" | "sending" | "success" | "error";
type Fields = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<Fields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Fields, string>): FieldErrors {
    const errors: FieldErrors = {};
    if (!values.name) errors.name = "Please enter your name.";
    if (!values.email) errors.email = "Please enter your email.";
    else if (!EMAIL_PATTERN.test(values.email)) errors.email = "That email address doesn't look right.";
    if (!values.subject) errors.subject = "Please add a subject.";
    if (!values.message) errors.message = "Please write a message.";
    else if (values.message.length < 10) errors.message = "Your message is a bit short — add a few more words.";
    return errors;
}

export function Contact() {
    const [status, setStatus] = useState<Status>("idle");
    const [feedback, setFeedback] = useState("");
    const [errors, setErrors] = useState<FieldErrors>({});
    // A ref guards against double submits that happen before React re-renders.
    const submitting = useRef(false);
    const formRef = useReveal<HTMLFormElement>();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (submitting.current) return;

        const form = e.currentTarget;
        const data = new FormData(form);
        const values = {
            name: String(data.get("name") ?? "").trim(),
            email: String(data.get("email") ?? "").trim(),
            subject: String(data.get("subject") ?? "").trim(),
            message: String(data.get("message") ?? "").trim(),
        };

        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length > 0) {
            setStatus("idle");
            setFeedback("");
            form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
            return;
        }

        submitting.current = true;
        setStatus("sending");
        setFeedback("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!response.ok) {
                const body = (await response.json().catch(() => null)) as { message?: string } | null;
                throw new Error(body?.message ?? "Failed to send message");
            }
            form.reset();
            setStatus("success");
            setFeedback("Thanks! Your message is on its way — I'll reply by email soon.");
        } catch (err) {
            console.error("Contact form error:", err);
            setStatus("error");
            setFeedback("Your message couldn't be sent. Please try again, or email me directly using the link above.");
        } finally {
            submitting.current = false;
        }
    }

    const sending = status === "sending";

    return (
        <section id="contact" className="section section-tint" aria-labelledby="contact-title">
            <div className="container">
                <SectionHeading id="contact" index="06" title="Contact" lead={contact.intro} />

                <div className="contact-grid">
                    <Reveal as="ul" className="contact-methods">
                        {contact.methods.map((m) => {
                            const external = !m.href.startsWith("mailto:");
                            return (
                                <li key={m.label}>
                                    <a href={m.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer noopener" : undefined} className="method">
                                        <span className="method-label">{m.label}</span>
                                        <span className="method-value">{m.value}</span>
                                        <span className="method-hint">{m.hint}</span>
                                        <span className="method-arrow" aria-hidden="true">↗</span>
                                    </a>
                                </li>
                            );
                        })}
                    </Reveal>

                    <form ref={formRef} className="form reveal" style={{ "--d": "80ms" } as CSSProperties} onSubmit={handleSubmit} noValidate aria-busy={sending}>
                        {(
                            [
                                { name: "name", label: "Name", type: "text", placeholder: "Your name", autoComplete: "name" },
                                { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
                                { name: "subject", label: "Subject", type: "text", placeholder: "What would you like to talk about?", autoComplete: "off" },
                            ] as const
                        ).map((f) => (
                            <div key={f.name} className="field-row">
                                <label htmlFor={`contact-${f.name}`}>{f.label}</label>
                                <input
                                    id={`contact-${f.name}`}
                                    name={f.name}
                                    type={f.type}
                                    placeholder={f.placeholder}
                                    autoComplete={f.autoComplete}
                                    required
                                    maxLength={200}
                                    aria-invalid={errors[f.name] ? true : undefined}
                                    aria-describedby={errors[f.name] ? `contact-${f.name}-error` : undefined}
                                    disabled={sending}
                                />
                                {errors[f.name] && <p id={`contact-${f.name}-error`} className="field-error">{errors[f.name]}</p>}
                            </div>
                        ))}

                        <div className="field-row">
                            <label htmlFor="contact-message">Message</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows={6}
                                placeholder="Write your message…"
                                required
                                maxLength={5000}
                                aria-invalid={errors.message ? true : undefined}
                                aria-describedby={errors.message ? "contact-message-error" : undefined}
                                disabled={sending}
                            />
                            {errors.message && <p id="contact-message-error" className="field-error">{errors.message}</p>}
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary" disabled={sending}>
                                {sending ? "Sending…" : "Send message"}
                                {!sending && <span aria-hidden="true">↗</span>}
                            </button>
                            <p className={`form-status${status === "error" ? " is-error" : ""}${status === "success" ? " is-success" : ""}`} role={status === "error" ? "alert" : "status"}>
                                {feedback}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
