import { useCallback, useEffect, useState } from "react";

type Settled<T> = { key: string; data: T | null; error: string | null };

export type ApiState<T> = {
    data: T | null;
    error: string | null;
    loading: boolean;
    reload: () => void;
};

/**
 * Fetches JSON from one of the /api endpoints.
 * `parse` validates the response shape and returns the data the UI needs
 * (pass a module-level function so it stays referentially stable).
 * Loading is derived (never set synchronously inside the effect), requests are
 * aborted on unmount / URL change, and `reload` re-runs a failed request.
 */
export function useApi<T>(url: string, parse: (json: unknown) => T): ApiState<T> {
    const [nonce, setNonce] = useState(0);
    const [settled, setSettled] = useState<Settled<T> | null>(null);
    const key = `${url}#${nonce}`;

    useEffect(() => {
        const controller = new AbortController();

        fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`Request failed (${response.status})`);
                }
                return parse(await response.json());
            })
            .then((data) => setSettled({ key, data, error: null }))
            .catch((err: unknown) => {
                if (controller.signal.aborted) return;
                console.error(`API error for ${url}:`, err);
                setSettled({
                    key,
                    data: null,
                    error: err instanceof Error ? err.message : "Something went wrong",
                });
            });

        return () => controller.abort();
    }, [url, key, parse]);

    const reload = useCallback(() => setNonce((n) => n + 1), []);
    const current = settled?.key === key ? settled : null;

    return {
        data: current?.data ?? null,
        error: current?.error ?? null,
        loading: current === null,
        reload,
    };
}
