import { useMemo, useState } from "react";
import { siteConfig } from "../lib/data";
import { useApi } from "../lib/useApi";
import { StateMessage } from "./SectionLabel";

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
const YEARS = Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, i) => CURRENT_YEAR - i);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseContributions(json: unknown): ContributionData {
    const data = json as Partial<ContributionData> | null;
    if (!data || !Array.isArray(data.weeks) || typeof data.totalContributions !== "number") {
        throw new Error("Unexpected response from the contributions API");
    }
    return data as ContributionData;
}

function getLevel(count: number) {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 9) return 3;
    return 4;
}

function describe(day: ContributionDay) {
    const n = day.contributionCount;
    return `${n} contribution${n === 1 ? "" : "s"} on ${day.date}`;
}

export function ContributionGraph() {
    const [year, setYear] = useState(CURRENT_YEAR);
    const { data, loading, error, reload } = useApi(`/api/github-contributions?year=${year}`, parseContributions);

    // Month labels: put a label above the first week that starts a new month.
    const monthLabels = useMemo(() => {
        if (!data) return [];
        let last = -1;
        return data.weeks.map((week) => {
            const first = week.contributionDays[0];
            if (!first) return "";
            const month = Number(first.date.slice(5, 7)) - 1;
            if (month === last) return "";
            last = month;
            return MONTHS[month];
        });
    }, [data]);

    return (
        <div className="contrib" aria-busy={loading}>
            <div className="contrib-head">
                <div>
                    <p className="eyebrow">GitHub activity</p>
                    <p className="contrib-user">
                        <a href={`https://github.com/${siteConfig.username}`} target="_blank" rel="noreferrer noopener">
                            @{data?.username ?? siteConfig.username}
                        </a>
                    </p>
                </div>

                <div className="chips" role="group" aria-label="Contribution year">
                    {YEARS.map((item) => (
                        <button key={item} type="button" className={`chip${year === item ? " is-active" : ""}`} aria-pressed={year === item} onClick={() => setYear(item)}>
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {loading && <div className="contrib-skeleton" role="status" aria-label="Loading GitHub contributions" />}

            {!loading && error && (
                <StateMessage tone="error" title="Couldn't load GitHub contributions." detail={error} onRetry={reload} />
            )}

            {!loading && !error && data && (
                <>
                    <p className="contrib-total">
                        <strong>{data.totalContributions.toLocaleString()}</strong> contributions in {data.year}
                    </p>

                    <div className="contrib-scroll" tabIndex={0} role="region" aria-label={`Contribution calendar for ${data.year}`}>
                        <div className="contrib-grid">
                            {data.weeks.map((week, w) => (
                                <div key={w} className="contrib-week">
                                    <span className="contrib-month" aria-hidden="true">{monthLabels[w]}</span>
                                    {week.contributionDays.map((day) => (
                                        <span key={day.date} className={`cell level-${getLevel(day.contributionCount)}`} title={describe(day)} aria-label={describe(day)} role="img" style={{ gridRow: day.weekday + 2 }} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="contrib-legend" aria-hidden="true">
                        <span>Less</span>
                        {[0, 1, 2, 3, 4].map((l) => (
                            <span key={l} className={`cell level-${l}`} />
                        ))}
                        <span>More</span>
                    </div>
                </>
            )}
        </div>
    );
}
