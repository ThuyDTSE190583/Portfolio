import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  ExternalLink,
  ArrowUpRight,
  Star,
  RefreshCw,
  GitBranch,
  Clock3,
  Users,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const GITHUB_USERNAME = "ThuyDTSE190583";
const GITHUB_ORG = "ResearchPulse";

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2026-03-10",
};

const PROJECT_REFRESH_INTERVAL = 5 * 60 * 1000;

const Projects = () => {
  const { t } = useTranslation();

  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchRepositories = useCallback(async (manual = false) => {
    try {
      if (manual) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [personalResponse, organizationResponse] = await Promise.all([
        fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`,
          {
            headers: GITHUB_HEADERS,
          },
        ),
        fetch(
          `https://api.github.com/orgs/${GITHUB_ORG}/repos?sort=updated&direction=desc&per_page=100`,
          {
            headers: GITHUB_HEADERS,
          },
        ),
      ]);

      if (!personalResponse.ok) {
        throw new Error(
          `Failed to load personal repositories (${personalResponse.status})`,
        );
      }

      if (!organizationResponse.ok) {
        throw new Error(
          `Failed to load organization repositories (${organizationResponse.status})`,
        );
      }

      const personalRepos = await personalResponse.json();
      const organizationRepos = await organizationResponse.json();

      const personal = personalRepos.map((repo) => ({
        ...repo,
        source: "personal",
      }));

      const team = organizationRepos.map((repo) => ({
        ...repo,
        source: "team",
      }));

      /*
       * Merge repositories and remove duplicates.
       * This is useful if the same repository appears
       * through both sources.
       */
      const merged = [...personal, ...team];

      const uniqueRepositories = Array.from(
        new Map(merged.map((repo) => [repo.id, repo])).values(),
      );

      /*
       * Newest updated repositories first.
       */
      uniqueRepositories.sort(
        (a, b) =>
          new Date(b.pushed_at || b.updated_at) -
          new Date(a.pushed_at || a.updated_at),
      );

      setRepositories(uniqueRepositories);
    } catch (err) {
      console.error("GitHub repository error:", err);
      setError(
        "Unable to load GitHub repositories right now. Please try again later.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRepositories();

    const interval = setInterval(() => {
      fetchRepositories();
    }, PROJECT_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchRepositories]);

  /*
   * Featured repository:
   * Prefer ResearchPulse repositories.
   * Otherwise use the newest personal repository.
   */
  const featuredRepository = useMemo(() => {
    const teamRepository = repositories.find((repo) => repo.source === "team");

    return teamRepository || repositories[0] || null;
  }, [repositories]);

  const normalRepositories = useMemo(() => {
    if (!featuredRepository) {
      return [];
    }

    return repositories.filter((repo) => repo.id !== featuredRepository.id);
  }, [repositories, featuredRepository]);

  const formatUpdatedTime = (date) => {
    if (!date) return "Unknown";

    return new Intl.RelativeTimeFormat("en", {
      numeric: "auto",
    }).format(
      Math.round(
        (new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
      ),
      "day",
    );
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-blue-400",
      Java: "bg-red-400",
      Python: "bg-blue-500",
      Dart: "bg-cyan-400",
      HTML: "bg-orange-500",
      CSS: "bg-purple-500",
      C: "bg-slate-400",
      "C++": "bg-pink-500",
      "C#": "bg-green-500",
      PHP: "bg-indigo-400",
      Go: "bg-cyan-500",
      Rust: "bg-orange-600",
    };

    return colors[language] || "bg-primary";
  };

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[140px] pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-purple-600/5 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card mb-6"
            >
              <Code2 className="w-4 h-4 text-primary" />

              <span className="text-sm font-medium tracking-wide text-white">
                {t("projects.badge")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold font-poppins text-white"
            >
              Featured Projects
              <span className="text-gradient"> & GitHub</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-slate-400 max-w-2xl text-base md:text-lg"
            >
              A selection of my projects and repositories, automatically
              synchronized with GitHub.
            </motion.p>
          </div>

          {/* GitHub profile + refresh */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fetchRepositories(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-primary/40 transition-all disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />

              <span className="text-sm font-medium">Refresh</span>
            </button>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-primary/40 transition-all"
            >
              <FaGithub className="w-5 h-5" />

              <span className="text-sm font-medium">GitHub</span>

              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[260px] rounded-3xl bg-white/[0.025] border border-white/[0.06] animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-400/20 bg-red-400/5 p-8 text-center">
            <p className="text-slate-300 mb-4">{error}</p>

            <button
              type="button"
              onClick={() => fetchRepositories(true)}
              className="px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Featured repository */}
        {!loading && !error && featuredRepository && (
          <motion.a
            href={featuredRepository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="group relative block rounded-[2rem] overflow-hidden border border-primary/20 bg-gradient-to-r from-primary/[0.08] via-white/[0.025] to-white/[0.015] hover:border-primary/40 transition-all duration-500 mb-8"
          >
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-[450px] h-[300px] bg-primary/10 blur-[100px] opacity-40 group-hover:opacity-70 transition-opacity" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[360px]">
              {/* Left */}
              <div className="p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.06]">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 border border-white/10 text-white text-sm font-semibold mb-8">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />

                    <span>Featured Project</span>
                  </div>

                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-primary font-bold tracking-[0.25em] text-sm">
                      01 / FEATURED
                    </span>

                    {featuredRepository.source === "team" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-400/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                        <Users className="w-3 h-3" />
                        Team
                      </span>
                    )}
                  </div>

                  <h3 className="text-4xl md:text-5xl font-bold font-poppins text-white leading-tight group-hover:text-primary transition-colors">
                    {featuredRepository.name}
                  </h3>

                  <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-xl">
                    {featuredRepository.description ||
                      "Software project available on GitHub."}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {featuredRepository.language && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-300 text-sm">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(
                          featuredRepository.language,
                        )}`}
                      />

                      {featuredRepository.language}
                    </span>
                  )}

                  {featuredRepository.stargazers_count > 0 && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-300 text-sm">
                      <Star className="w-4 h-4 text-yellow-400" />

                      {featuredRepository.stargazers_count}
                    </span>
                  )}
                </div>
              </div>

              {/* Right */}
              <div className="p-8 md:p-12 flex flex-col justify-between bg-black/10">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-4">
                    Repository
                  </p>

                  <p className="text-2xl font-semibold text-white break-words">
                    {featuredRepository.full_name}
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-slate-400">
                      <Clock3 className="w-5 h-5 text-primary" />

                      <span>
                        Updated{" "}
                        <span className="text-slate-200">
                          {formatUpdatedTime(
                            featuredRepository.pushed_at ||
                              featuredRepository.updated_at,
                          )}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400">
                      <GitBranch className="w-5 h-5 text-primary" />

                      <span>
                        Default branch:{" "}
                        <span className="text-slate-200">
                          {featuredRepository.default_branch}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <span className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-semibold group-hover:bg-primary group-hover:text-white transition-all">
                    <FaGithub className="w-5 h-5" />
                    View on GitHub
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </motion.a>
        )}

        {/* Repository grid */}
        {!loading && !error && normalRepositories.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">
                  Latest repositories
                </p>

                <h3 className="text-2xl font-bold text-white mt-2">
                  GitHub Activity
                </h3>
              </div>

              <span className="text-xs text-slate-500">
                {normalRepositories.length} repositories
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {normalRepositories.map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                  }}
                  className="group relative flex flex-col min-h-[250px] rounded-3xl bg-white/[0.025] border border-white/[0.07] p-6 hover:-translate-y-1.5 hover:border-primary/30 hover:bg-primary/[0.025] transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                      <FaGithub className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                    </div>

                    {repo.source === "team" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-400/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                        <Users className="w-3 h-3" />
                        Team
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                        Personal
                      </span>
                    )}
                  </div>

                  <div className="relative z-10 mt-6 flex-1">
                    <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors break-words">
                      {repo.name}
                    </h4>

                    <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {repo.description ||
                        "No description provided for this repository."}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        {repo.language && (
                          <span className="inline-flex items-center gap-2">
                            <span
                              className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(
                                repo.language,
                              )}`}
                            />

                            {repo.language}
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" />
                          {repo.stargazers_count}
                        </span>
                      </div>

                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}

        {/* GitHub footer link */}
        <div className="flex justify-center mt-12">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.025] text-slate-300 hover:text-white hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            <FaGithub className="w-5 h-5" />

            <span>View all repositories on GitHub</span>

            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
