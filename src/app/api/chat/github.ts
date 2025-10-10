// lib/github.ts
type Repo = {
    name: string; html_url: string; description: string | null;
    language: string | null; stargazers_count: number; forks_count: number;
    topics?: string[]; updated_at: string;
};

const GH_USER = process.env.GITHUB_PUBLIC_USERNAME!;
const GH_TOKEN = process.env.GITHUB_API_TOKEN;

const HEADERS: Record<string, string> = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(GH_TOKEN ? { Authorization: `Bearer ${GH_TOKEN}` } : {}),
};

// cache em memória do process (reinicia a cada deploy)
const mem = globalThis as any;
if (!mem.__GH_CACHE__) mem.__GH_CACHE__ = { at: 0, data: "" };

function trunc(s: string, max = 6000) {
    if (s.length <= max) return s;
    return s.slice(0, max) + "\n…(truncated)…";
}

async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url, { headers: HEADERS, cache: "no-store" });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res.json() as Promise<T>;
}

async function fetchText(url: string): Promise<string> {
    const res = await fetch(url, { headers: HEADERS, cache: "no-store" });
    if (!res.ok) return "";
    return res.text();
}

/** Constrói um “contexto” legível com top repositórios + README resumido */
export async function buildGitHubContext(): Promise<string> {
    // cache 2 minutos
    const now = Date.now();
    if (mem.__GH_CACHE__.data && now - mem.__GH_CACHE__.at < 120000) {
        return mem.__GH_CACHE__.data as string;
    }

    // 1) lista repos ordenados por atualização
    const repos = await fetchJSON<Repo[]>(
        `https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`
    );

    // 2) escolhe os 10 mais relevantes (stars + recente)
    const top = [...repos]
        .sort((a, b) =>
            (b.stargazers_count - a.stargazers_count) ||
            (new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        )
        .slice(0, 10);

    // 3) para cada repo, tenta README bruto
    const items: string[] = [];
    for (const r of top) {
        // tenta raw README (caminhos comuns)
        const rawCandidates = [
            `https://raw.githubusercontent.com/${GH_USER}/${r.name}/main/README.md`,
            `https://raw.githubusercontent.com/${GH_USER}/${r.name}/master/README.md`,
        ];
        let readme = "";
        for (const u of rawCandidates) {
            readme = await fetchText(u);
            if (readme && readme.length > 0) break;
        }

        const header =
            `• ${r.name} — ${r.description ?? "sem descrição"}\n` +
            `  URL: ${r.html_url}\n` +
            `  Lang: ${r.language ?? "n/a"} | ⭐ ${r.stargazers_count} | 🍴 ${r.forks_count}` +
            (r.topics?.length ? ` | topics: ${r.topics.join(", ")}` : "");

        const body = readme
            ? `  README:\n${trunc(readme, 2000).replace(/^/gm, "  ")}`
            : `  README: (não encontrado)`;

        items.push(`${header}\n${body}`);
    }

    const context =
        `# GitHub Live Context (user: ${GH_USER})
Esta secção é gerada em tempo real a partir da API do GitHub. Usa-a como fonte factual sobre os repositórios do Muaiad.

${items.join("\n\n")}
`;

    mem.__GH_CACHE__ = { at: now, data: context };
    return context;
}
