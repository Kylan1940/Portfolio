import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/lib/database.types.ts";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase environment variables are not configured");
}

const supabase = createClient<Database>(
    supabaseUrl,
    supabaseAnonKey
);

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({
            message: "Method not allowed",
        });
    }

    try {
        const { data, error } = await supabase
            .from("projects")
            .select("id, name, description, stack, status, github, demo, sort_order, created_at")
            .order("sort_order", {ascending: true, nullsFirst: false,})
            .order("created_at", {ascending: false});

        if (error) {
            console.error("Supabase projects error:", error.message);
            return res.status(500).json({
                message: "Failed to fetch projects",
            });
        }

        return res.status(200).json({
            projects: data ?? [],
        });
    } catch (error) {
        console.error("Projects API error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}