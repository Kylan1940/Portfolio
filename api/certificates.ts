import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({
            message: "Method not allowed",
        });
    }
    if (!supabaseUrl || !supabaseAnonKey) {
        return res.status(500).json({
            message: "Supabase environment variables are missing",
            debug: {
                SUPABASE_URL: Boolean(supabaseUrl),
                SUPABASE_ANON_KEY: Boolean(supabaseAnonKey),
            },
        });
    }

    try {
        const supabase = createClient(
            supabaseUrl,
            supabaseAnonKey
        );
        const { data, error } = await supabase
            .from("certificates")
            .select("*")
            .order("issue_date", {ascending: false,});
        if (error) {
            console.error("Supabase error:", error);
            return res.status(500).json({
                message: "Supabase query failed",
                error: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code,
            });
        }
        return res.status(200).json({
            certificates: data ?? [],
        });
    } catch (error) {
        console.error("Certificates API error:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}