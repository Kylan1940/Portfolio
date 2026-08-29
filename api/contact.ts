import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactRequest {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default async function handler(req: Request) {
    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({
                message: "Method not allowed",
            }),
            {
                status: 405,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    try {
        const body = (await req.json()) as ContactRequest;

        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return new Response(
                JSON.stringify({
                    message: "All fields are required",
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
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

            return new Response(
                JSON.stringify({
                    message: "Failed to send email",
                }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        return new Response(
            JSON.stringify({
                message: "Email sent successfully",
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Contact API error:", error);

        return new Response(
            JSON.stringify({
                message: "Internal server error",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}