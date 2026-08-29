import { useState, type FormEvent } from "react";
import { contact } from "../lib/data";

export function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        setStatus("sending");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    subject: formData.get("subject"),
                    message: formData.get("message"),
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to send message");
            }
            form.reset();
            setStatus("success");
        } catch {
            setStatus("error");
        }
    }
    return (
    <section id="contact" className="page-section">
        <div className="section-inner">
            {/* <h2>Contact</h2> */}
            <p className="text-neutral-400 text-base leading-relaxed max-w-md mb-8">{contact.intro}</p>
            <div className="contact-list">
                {contact.methods.map((m) => {
                    const isExternal = !m.href.startsWith('mailto:')
                    return (
                        <a key={m.label} href={m.href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer noopener' : undefined} className="contact-row">
                            <div className="contact-row-main">
                                <span className="contact-label">{m.label}</span>
                                <span className="contact-value">{m.value}</span>
                                <span className="contact-hint">{m.hint}</span>
                            </div>
                            <span className="contact-arrow" aria-hidden="true">↗</span>
                        </a>
                    )
                })}
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name"  type="text"  placeholder="Your name"  required/>
                </div>
                <div className="contact-field">
                    <label htmlFor="email">Email</label>
                    <input id="email"  name="email"  type="email"  placeholder="you@example.com" required/>
                </div>
                <div className="contact-field">
                    <label htmlFor="subject">Subject</label>
                    <input id="subject" name="subject"  type="text"  placeholder="What would you like to talk about?" required />
                </div>
                <div className="contact-field">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" placeholder="Write your message..." rows={6} required />
                </div>
                <button type="submit"  className="contact-submit" disabled={status === "sending"} >
                    {status === "sending" ? "Sending..." : "Send Message"}
                    {status !== "sending" && (<span aria-hidden="true">↗</span>)}
                </button>
                    {status === "success" && (
                        <p className="contact-status success">Message sent successfully.</p>
                    )}
                    {status === "error" && (
                        <p className="contact-status error">Failed to send message. Please try again.</p>
                    )}
            </form>
        </div>
    </section>
  );
}