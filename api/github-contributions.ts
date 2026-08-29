import type { VercelRequest, VercelResponse } from "@vercel/node";

const GITHUB_API = "https://api.github.com/graphql";
const GITHUB_USERNAME = "Kylan1940";

interface ContributionDay {
    date: string;
    contributionCount: number;
    weekday: number;
}

interface GraphQLResponse {
    data?: {
        user: {
            contributionsCollection: {
                contributionCalendar: {
                    totalContributions: number;
                    weeks: {
                        contributionDays: ContributionDay[];
                    }[];
                };
            };
        };
    };
    errors?: {
        message: string;
    }[];
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({
            message: "Method not allowed",
        });
    }

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return res.status(500).json({
            message: "GitHub token is not configured",
        });
    }

    const yearParam = req.query.year;

    const year = Number(
        Array.isArray(yearParam) ? yearParam[0] : yearParam
    );

    const currentYear = new Date().getFullYear();

    if (!Number.isInteger(year) || year < 2008 || year > currentYear) {
        return res.status(400).json({
            message: "Invalid year",
        });
    }

    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year}-12-31T23:59:59Z`;

    const query = `
        query Contributions(
            $username: String!
            $from: DateTime!
            $to: DateTime!
        ) {
            user(login: $username) {
                contributionsCollection(
                    from: $from
                    to: $to
                ) {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                                weekday
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(GITHUB_API, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/vnd.github+json",
            },
            body: JSON.stringify({
                query,
                variables: {
                    username: GITHUB_USERNAME,
                    from,
                    to,
                },
            }),
        });

        const result = (await response.json()) as GraphQLResponse;

        if (!response.ok || result.errors) {
            console.error("GitHub API error:", result.errors);

            return res.status(500).json({
                message: "Failed to fetch GitHub contributions",
            });
        }

        const calendar =
            result.data?.user?.contributionsCollection
                .contributionCalendar;

        if (!calendar) {
            return res.status(404).json({
                message: "GitHub user not found",
            });
        }

        return res.status(200).json({
            username: GITHUB_USERNAME,
            year,
            totalContributions: calendar.totalContributions,
            weeks: calendar.weeks,
        });
    } catch (error) {
        console.error("GitHub contribution error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}