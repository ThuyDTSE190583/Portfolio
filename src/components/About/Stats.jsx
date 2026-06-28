import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUpModule from 'react-countup';
const CountUp = CountUpModule.default || CountUpModule;
import { BookOpen, GitCommit, FolderGit2, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Stats = () => {
  const { t } = useTranslation();
  const [githubStats, setGithubStats] = useState({
    repos: 50,
    commits: 500,
    projects: 10,
    followers: 5
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const username = import.meta.env.VITE_GITHUB_USERNAME || 'ThuyDTSE190583';
        
        // Fetch user data (repos, followers)
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('Failed to fetch user data');
        const userData = await userRes.json();

        // Fetch commits (This uses the search API, which has strict rate limits)
        let commitCount = 500;
        try {
          const commitRes = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
            headers: {
              'Accept': 'application/vnd.github.cloak-preview'
            }
          });
          if (commitRes.ok) {
            const commitData = await commitRes.json();
            commitCount = commitData.total_count || 500;
          }
        } catch (e) {
          console.warn('Could not fetch commit count', e);
        }

        setGithubStats({
          repos: userData.public_repos || 50,
          commits: commitCount,
          projects: 10,
          followers: userData.followers || 5
        });

      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    };

    fetchGitHubStats();
  }, []);

  const stats = [
    {
      id: 1,
      title: t('stats.repos'),
      count: githubStats.repos,
      suffix: "+",
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/50"
    },
    {
      id: 2,
      title: t('stats.commits'),
      count: githubStats.commits,
      suffix: "+",
      icon: GitCommit,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/50"
    },
    {
      id: 3,
      title: t('stats.projects'),
      count: githubStats.projects,
      suffix: "+",
      icon: FolderGit2,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/50"
    },
    {
      id: 4,
      title: t('stats.followers'),
      count: githubStats.followers,
      suffix: "+",
      icon: Users,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "hover:border-amber-500/50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="pb-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className={`glass-card p-6 rounded-2xl flex items-center gap-6 group transition-all duration-300 border border-white/5 ${stat.border} hover:-translate-y-1 hover:shadow-2xl hover:shadow-${stat.color.split('-')[1]}-500/10`}
            >
              <div className={`w-14 h-14 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <h4 className="text-3xl font-bold font-poppins text-white mb-1 flex items-center">
                  <CountUp end={stat.count} duration={2.5} enableScrollSpy scrollSpyOnce />
                  <span>{stat.suffix}</span>
                </h4>
                <p className="text-sm font-medium text-slate-400">
                  {stat.title}
                </p>
              </div>
            </motion.div>
            );
          })}
        </motion.div>

        {/* GitHub Activity & Top Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-12 grid grid-cols-1 xl:grid-cols-3 gap-6"
        >
          {/* Contribution Calendar */}
          <div className="xl:col-span-2 glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-background/50 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h4 className="text-xl font-bold text-white mb-6 font-poppins flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-emerald-500" />
              Contribution Graph
            </h4>
            <div className="overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[800px]">
                <img 
                  src={`https://ghchart.rshah.org/10b981/ThuyDTSE190583`} 
                  alt="GitHub Contribution Graph" 
                  className="w-full h-auto hue-rotate-180 invert opacity-90 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Top Languages */}
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-background/50 backdrop-blur-sm relative overflow-hidden group flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h4 className="text-xl font-bold text-white mb-6 font-poppins flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Top Languages
            </h4>
            <div className="flex justify-center w-full">
              <img 
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=ThuyDTSE190583&layout=compact&theme=vision-friendly-dark&hide_border=true&bg_color=00000000&title_color=3b82f6&text_color=94a3b8`} 
                alt="Top Languages"
                className="w-full max-w-[350px] opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
