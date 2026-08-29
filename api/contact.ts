import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactRequest {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed",
        });
    }

    try {
        const { name, email, subject, message } =
            req.body as ContactRequest;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const { error } = await resend.emails.send({
            from: "Portfolio Contact <contact@valeriankc.my.id>",
            to: ["kevincasendra01@gmail.com"],
            replyTo: email,
            subject: `[Portfolio] ${subject}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                "",
                message,
            ].join("\n"),
        });

        if (error) {
            console.error("Resend error:", error);

            return res.status(500).json({
                message: "Failed to send email",
            });
        }

        return res.status(200).json({
            message: "Email sent successfully",
        });
    } catch (error) {
        console.error("Contact API error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}