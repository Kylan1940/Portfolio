import { useEffect, useState } from "react";

interface ContributionDay {
    date: string;
    contributionCount: number;
    weekday: number;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

interface ContributionData {
    username: string;
    year: number;
    totalContributions: number;
    weeks: ContributionWeek[];
}

const START_YEAR = 2020;
const CURRENT_YEAR = new Date().getFullYear();

export function ContributionGraph() {
    const [year, setYear] = useState(CURRENT_YEAR);
    const [data, setData] = useState<ContributionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function fetchContributions() {
            setLoading(true);
            setError(false);

            try {
                const response = await fetch(
                    `/api/github-contributions?year=${year}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch contributions");
                }

                const result = (await response.json()) as ContributionData;

                if (!cancelled) {
                    setData(result);
                }
            } catch {
                if (!cancelled) {
                    setError(true);
                    setData(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchContributions();

        return () => {
            cancelled = true;
        };
    }, [year]);

    function getLevel(count: number) {
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 5) return 2;
        if (count <= 9) return 3;
        return 4;
    }

    const years = Array.from(
        { length: CURRENT_YEAR - START_YEAR + 1 },
        (_, index) => CURRENT_YEAR - index
    );

    return (
        <div className="contribution-block">
            <div className="contribution-header">
                <div>
                    <span className="contribution-label">
                        GitHub Activity
                    </span>

                    <p className="contribution-title">
                        @{data?.username ?? "Kylan1940"}
                    </p>
                </div>

                <div
                    className="contribution-years"
                    role="tablist"
                    aria-label="Contribution year"
                >
                    {years.map((item) => (
                        <button
                            key={item}
                            type="button"
                            role="tab"
                            aria-selected={year === item}
                            className={`contribution-year${
                                year === item ? " active" : ""
                            }`}
                            onClick={() => setYear(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {loading && (
                <div className="contribution-state">
                    Loading contributions...
                </div>
            )}

            {error && (
                <div className="contribution-state">
                    Failed to load GitHub contributions.
                </div>
            )}

            {!loading && !error && data && (
                <>
                    <div className="contribution-summary">
                        <span>
                            {data.totalContributions.toLocaleString()}{" "}
                            contributions in {data.year}
                        </span>
                    </div>

                    <div className="contribution-scroll">
                        <div className="contribution-graph">
                            {data.weeks.map((week, weekIndex) => (
                                <div
                                    key={weekIndex}
                                    className="contribution-week"
                                >
                                    {week.contributionDays.map((day) => (
                                        <div
                                            key={day.date}
                                            className={`contribution-cell level-${getLevel(
                                                day.contributionCount
                                            )}`}
                                            title={`${day.contributionCount} contribution${
                                                day.contributionCount === 1
                                                    ? ""
                                                    : "s"
                                            } on ${day.date}`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="contribution-legend">
                        <span>Less</span>

                        <span className="legend-cell level-0" />
                        <span className="legend-cell level-1" />
                        <span className="legend-cell level-2" />
                        <span className="legend-cell level-3" />
                        <span className="legend-cell level-4" />

                        <span>More</span>
                    </div>
                </>
            )}
        </div>
    );
}