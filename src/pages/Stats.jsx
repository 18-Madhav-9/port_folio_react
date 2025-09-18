import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  GitPullRequest,
  Code,
  Star,
  Terminal,
  Award,
  ExternalLink,
  Calendar,
  Trophy,
  Flame,
  BarChart2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";

import {
  fetchGithubStats as fetchGithubStatsFromService,
  fetchLeetCodeStats as fetchLeetCodeStatsFromService,
  fetchCodeforcesStats as fetchCodeforcesStatsFromService,
  fetchCodeChefStats as fetchCodeChefStatsFromService,
} from "../services/api";

const API_BASE_URL = "http://localhost:5000/api";

async function fetchGithubStats() {
  if (typeof fetchGithubStatsFromService === "function") {
    try {
      return await fetchGithubStatsFromService();
    } catch (error) {
      console.warn("Service fetch failed, switching to local API fallback:", error);
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/github/stats`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn("API unavailable. Using mock data for preview.", error);
    return {
      profile: { profileUrl: "https://github.com" },
      stats: {
        contributions: 2451,
        codeVolumeLabel: "1.8M",
        publicRepos: 48,
        stars: 312,
      },
      heatmap: {
        totalContributions: 2451,
        weeks: Array.from({ length: 14 }, (_, weekIndex) => ({
          contributionDays: Array.from({ length: 7 }, (_, dayIndex) => {
            const count = (weekIndex * 7 + dayIndex) % 5;
            const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
            return {
              contributionCount: count,
              date: `Mock date ${weekIndex + 1}-${dayIndex + 1}`,
              color: colors[count],
            };
          }),
        })),
      },
    };
  }
}

async function fetchLeetCodeData() {
  if (typeof fetchLeetCodeStatsFromService === "function") {
    try {
      const data = await fetchLeetCodeStatsFromService();
      if (data) return data;
    } catch (error) {
      console.warn("LeetCode service fetch failed:", error);
    }
  }
  try {
    const response = await fetch(`${API_BASE_URL}/stats/leetcode/stats`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    return {
      stats: { rating: "1,742", ranking: "Top 18%", totalSolved: 350 },
      profile: { profileUrl: "https://leetcode.com" },
      heatmap: { [new Date().toISOString().split('T')[0]]: 5 }, 

    }; 
  }
}

async function fetchCodeforcesData() {
  if (typeof fetchCodeforcesStatsFromService === "function") {
    try {
      const data = await fetchCodeforcesStatsFromService();
      if (data) return data;
    } catch (error) {
      console.warn("Codeforces service fetch failed:", error);
    }
  }
  try {
    const response = await fetch(`${API_BASE_URL}/stats/codeforces/stats`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    return {
      stats: { rating: 1465, maxRating: 1512 },
      profile: { rank: "Pupil", profileUrl: "https://codeforces.com" },
    };
  }
}

async function fetchCodeChefData() {
  if (typeof fetchCodeChefStatsFromService === "function") {
    try {
      const data = await fetchCodeChefStatsFromService();
      if (data) return data;
    } catch (error) {
      console.warn("CodeChef service fetch failed:", error);
    }
  }
  try {
    const response = await fetch(`${API_BASE_URL}/stats/codechef/stats`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    return {
      stats: { rating: 1812, highestRating: 1921, stars: 3 },
      profile: { profileUrl: "https://codechef.com" },
      heatmap: { [new Date().toISOString().split('T')[0]]: 2 }, 

    }; 
  }
}

async function fetchCertificates() {
  try {
    const response = await fetch(`${API_BASE_URL}/certificates`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn("Certificates API unavailable. Using mock data.", error);

    return [
      {
        title: "CS50: Introduction to Computer Science",
        issuer: "Harvard University",
        date: "Dec 2023",
        link: "https://pll.harvard.edu/course/cs50-introduction-computer-science",
      },
      {
        title: "Full Stack Open",
        issuer: "University of Helsinki",
        date: "Jan 2024",
        link: "https://fullstackopen.com/en/",
      }
    ];
  }
}

const PLATFORM_HEATMAPS = [
  {
    name: "LeetCode",
    id: "leetcode",
    icon: SiLeetcode,
    accent: "text-orange-500",
    legend: [
      "bg-slate-200 dark:bg-slate-700/50",
      "bg-orange-200 dark:bg-orange-900/80",
      "bg-orange-400 dark:bg-orange-700",
      "bg-orange-600 dark:bg-orange-500",
    ],
  },
  {
    name: "CodeChef",
    id: "codechef",
    icon: SiCodechef,
    accent: "text-amber-700",
    legend: [
      "bg-slate-200 dark:bg-slate-700/50",
      "bg-amber-200 dark:bg-amber-900/80",
      "bg-amber-400 dark:bg-amber-700",
      "bg-amber-600 dark:bg-amber-500",
    ],
  },
];

const BASE_CARD_CLASSES =
  "bg-white/80 dark:bg-slate-900/70 backdrop-blur-lg border border-white/60 dark:border-slate-700/60 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20";
const SECONDARY_CARD_CLASSES =
  "bg-slate-50/80 dark:bg-slate-950/20 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl shadow-sm";

const StatCard = ({ stat, isLoading }) => (
  <div className={`${BASE_CARD_CLASSES} p-5 flex flex-col items-center text-center transition-all hover:-translate-y-0.5`}>
    {isLoading ? (
      <div className="animate-pulse flex flex-col items-center w-full" aria-busy="true">
        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full mb-3" />
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-16 mb-1" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20" />
      </div>
    ) : (
      <>
        <stat.icon className={`w-8 h-8 mb-3 ${stat.color}`} aria-hidden="true" />
        <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">{stat.value}</p>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{stat.label}</p>
      </>
    )}
  </div>
);

const ProfileCard = ({ profile }) => (
  <a
    href={profile.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Visit my ${profile.name} profile`}
    className={`${BASE_CARD_CLASSES} p-4 flex flex-col items-center gap-3 hover:-translate-y-1 transition-all`}
  >
    <profile.icon className={`w-8 h-8 ${profile.color}`} aria-hidden="true" />
    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{profile.name}</span>
  </a>
);

const GithubHeatmapCard = ({ heatmap, isLoading }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isLoading && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [isLoading, heatmap]);

  if (isLoading) {
    return (
      <div className={`${BASE_CARD_CLASSES} p-5 animate-pulse`} aria-busy="true">
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-4" />
        <div className="h-28 bg-slate-200 dark:bg-slate-700 rounded w-full" />
      </div>
    );
  }

  if (!heatmap?.weeks) return null;

  return (
    <div className={`${BASE_CARD_CLASSES} p-5 transition-all hover:-translate-y-0.5`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaGithub className="w-5 h-5 text-emerald-600" aria-hidden="true" />
          <h3 className="font-bold text-slate-800 dark:text-slate-100">GitHub Activity</h3>
        </div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {heatmap.totalContributions?.toLocaleString() || 0} contributions
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-1.5 overflow-x-auto pb-2 custom-scrollbar"
        role="img"
        aria-label={`GitHub activity heatmap showing ${heatmap.totalContributions} contributions`}
      >
        {heatmap.weeks.map((week, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-1.5">
            {week.contributionDays.map((day, rowIndex) => {
              const hasContributions = day.contributionCount > 0;
              return (
                <div
                  key={`${colIndex}-${rowIndex}`}
                  className={`w-3 h-3 rounded-sm transition-colors ${!hasContributions ? "bg-slate-200 dark:bg-slate-700/50" : ""}`}
                  style={hasContributions ? { backgroundColor: day.color } : undefined}
                  title={`${day.contributionCount} contributions on ${day.date}`}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
        <span>Less</span>
        <div className="flex gap-1" aria-hidden="true">
          <div className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-700/50" />
          <div className="w-3 h-3 rounded-sm bg-[#9be9a8]" />
          <div className="w-3 h-3 rounded-sm bg-[#40c463]" />
          <div className="w-3 h-3 rounded-sm bg-[#30a14e]" />
          <div className="w-3 h-3 rounded-sm bg-[#216e39]" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

const PlatformHeatmapCard = ({ platform, rawData, isLoading }) => {
  const Icon = platform.icon;

  const data = useMemo(() => {
    const dailyCounts = rawData || {};
    const grid = [];
    const columns = 14;
    const rows = 7;
    const totalDays = columns * rows;

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - totalDays + 1);

    for (let c = 0; c < columns; c++) {
      const column = [];
      for (let r = 0; r < rows; r++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + (c * rows + r));

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        const count = dailyCounts[dateStr] || 0;

        let intensity = 0;
        if (count > 0 && count <= 2) intensity = 1;
        else if (count > 2 && count <= 5) intensity = 2;
        else if (count > 5) intensity = 3;

        column.push({ intensity, count, date: dateStr });
      }
      grid.push(column);
    }
    return grid;
  }, [rawData]);

  if (isLoading) {
    return (
      <div className={`${BASE_CARD_CLASSES} p-5 animate-pulse`} aria-busy="true">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-32" />
        </div>
        <div className="h-28 bg-slate-200 dark:bg-slate-700 rounded w-full" />
      </div>
    );
  }

  return (
    <div className={`${BASE_CARD_CLASSES} p-5 transition-all hover:-translate-y-0.5`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${platform.accent}`} aria-hidden="true" />
          <h3 className="font-bold text-slate-800 dark:text-slate-100">{platform.name} Activity</h3>
        </div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Last 98 days</span>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-2 custom-scrollbar" role="img" aria-label={`${platform.name} activity heatmap`}>
        {data.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-1.5">
            {col.map((day, rowIndex) => (
              <div
                key={`${colIndex}-${rowIndex}`}
                className={`w-3 h-3 rounded-sm ${platform.legend[day.intensity]} transition-colors`}
                title={`${day.count} activity on ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
        <span>Less</span>
        <div className="flex gap-1" aria-hidden="true">
          {platform.legend.map((bg, idx) => (
            <div key={idx} className={`w-3 h-3 rounded-sm ${bg}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

const ContestRankCard = ({ item, isLoading }) => {
  if (isLoading) {
    return (
      <div className={`${SECONDARY_CARD_CLASSES} p-5 animate-pulse`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20 mb-1" />
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24" />
          </div>
          <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded-full" />
        </div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-16 mb-2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-12 mb-1" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24" />
      </div>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block ${SECONDARY_CARD_CLASSES} p-5 hover:-translate-y-1 transition-transform`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.platform}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{item.title}</p>
        </div>
        <item.icon className={`w-5 h-5 ${item.accent}`} aria-hidden="true" />
      </div>

      <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{item.value}</p>
      <p className={`text-sm font-medium mt-2 ${item.accent}`}>{item.badge}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.detail}</p>
    </a>
  );
};

const CertificateSkeleton = () => (
  <div className={`${SECONDARY_CARD_CLASSES} p-5 animate-pulse`}>
    <div className="flex justify-between items-start mb-3">
      <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full" />
      <div className="w-16 h-3 bg-slate-200 dark:bg-slate-700 rounded" />
    </div>
    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mt-1" />
    <div className="mt-4 w-28 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
  </div>
);

const CertificateCard = ({ cert }) => (
  <a
    href={cert.link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`View certificate for ${cert.title}`}
    className={`group ${SECONDARY_CARD_CLASSES} p-5 hover:shadow-md hover:-translate-y-0.5 transition-all`}
  >
    <div className="flex justify-between items-start mb-3">
      <Award className="w-6 h-6 text-amber-600" aria-hidden="true" />
      <span className="text-xs flex items-center gap-1 text-slate-500 dark:text-slate-400">
        <Calendar className="w-3 h-3" aria-hidden="true" />
        {cert.date}
      </span>
    </div>

    <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
      {cert.title}
    </h4>
    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{cert.issuer}</p>

    <div className="mt-4 inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 text-sm font-medium">
      View Certificate
      <ExternalLink className="w-4 h-4" aria-hidden="true" />
    </div>
  </a>
);

const Stats = () => {
  const [githubData, setGithubData] = useState(null);
  const [isGithubLoading, setIsGithubLoading] = useState(true);

  const [platformsData, setPlatformsData] = useState({
    leetcode: null,
    codeforces: null,
    codechef: null,
  });
  const [isPlatformsLoading, setIsPlatformsLoading] = useState(true);

  const [certificatesData, setCertificatesData] = useState([]);
  const [isCertificatesLoading, setIsCertificatesLoading] = useState(true);

  useEffect(() => {
    const loadGithubData = async () => {
      try {
        const data = await fetchGithubStats();
        setGithubData(data);
      } catch (error) {
        console.error("Failed to load GitHub stats:", error);
      } finally {
        setIsGithubLoading(false);
      }
    };

    const loadPlatformsData = async () => {
      try {
        const [lc, cf, cc] = await Promise.all([
          fetchLeetCodeData(),
          fetchCodeforcesData(),
          fetchCodeChefData(),
        ]);
        setPlatformsData({ leetcode: lc, codeforces: cf, codechef: cc });
      } catch (error) {
        console.error("Failed to load platform stats:", error);
      } finally {
        setIsPlatformsLoading(false);
      }
    };

    const loadCertificates = async () => {
      try {
        const data = await fetchCertificates();
        setCertificatesData(data);
      } catch (error) {
        console.error("Failed to load certificates:", error);
      } finally {
        setIsCertificatesLoading(false);
      }
    };

    loadGithubData();
    loadPlatformsData();
    loadCertificates();
  }, []);

  const dynamicProfileLinks = useMemo(
    () => [
      {
        name: "GitHub",
        url: githubData?.profile?.profileUrl || "https://github.com",
        icon: FaGithub,
        color: "text-slate-800 dark:text-slate-100",
      },
      {
        name: "LeetCode",
        url: platformsData.leetcode?.profile?.profileUrl || "https://leetcode.com",
        icon: SiLeetcode,
        color: "text-orange-500",
      },
      {
        name: "Codeforces",
        url: platformsData.codeforces?.profile?.profileUrl || "https://codeforces.com",
        icon: SiCodeforces,
        color: "text-blue-500",
      },
      {
        name: "CodeChef",
        url: platformsData.codechef?.profile?.profileUrl || "https://codechef.com",
        icon: SiCodechef,
        color: "text-amber-700 dark:text-amber-500",
      },
    ],
    [githubData, platformsData]
  );

  const dynamicStats = useMemo(
    () => [
      {
        label: "Total Contributions",
        value: githubData?.stats?.contributions?.toLocaleString() || "-",
        icon: GitPullRequest,
        color: "text-emerald-500",
      },
      {
        label: "Code Volume",
        value: githubData?.stats?.codeVolumeLabel || "-",
        icon: Code,
        color: "text-orange-500",
      },
      {
        label: "Public Repos",
        value: githubData?.stats?.publicRepos?.toLocaleString() || "-",
        icon: Terminal,
        color: "text-amber-600",
      },
      {
        label: "GitHub Stars",
        value: githubData?.stats?.stars?.toLocaleString() || "-",
        icon: Star,
        color: "text-yellow-500",
      },
    ],
    [githubData]
  );

  const dynamicContestRanks = useMemo(() => {
    const lc = platformsData.leetcode;
    const cf = platformsData.codeforces;
    const cc = platformsData.codechef;

    return [
      {
        platform: "LeetCode",
        title: "Contest Rating / Solved",
        value: lc?.stats?.rating || lc?.stats?.totalSolved || "-",
        badge: lc?.stats?.ranking || lc?.profile?.ranking || "Active",
        detail: lc?.stats?.totalSolved ? `${lc.stats.totalSolved} problems solved` : "Active participant",
        icon: Trophy,
        accent: "text-orange-500",
        url: lc?.profile?.profileUrl || "https://leetcode.com",
      },
      {
        platform: "CodeChef",
        title: "Star Rating",
        value: cc?.stats?.rating || "-",
        badge: cc?.stats?.stars ? `${cc.stats.stars}-Star` : "Active",
        detail: cc?.stats?.highestRating ? `Best rating: ${cc.stats.highestRating}` : "Active participant",
        icon: Flame,
        accent: "text-amber-600",
        url: cc?.profile?.profileUrl || "https://codechef.com",
      },
      {
        platform: "Codeforces",
        title: "Problem Solving",
        value: cf?.stats?.rating || "-",
        badge: cf?.profile?.rank || "Unrated",
        detail: cf?.stats?.maxRating ? `Best rating: ${cf.stats.maxRating}` : "Active participant",
        icon: BarChart2,
        accent: "text-blue-500",
        url: cf?.profile?.profileUrl || "https://codeforces.com",
      },
    ];
  }, [platformsData]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      <header className="rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border border-amber-100/70 dark:border-slate-700/70 p-6 md:p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Dashboard Stats</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm max-w-2xl">
          A real-time overview of development activity, coding profiles, contest performance, and achievements.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-label="Quick statistics">
        {dynamicStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} isLoading={isGithubLoading} />
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
          <Terminal className="w-5 h-5 text-amber-600" aria-hidden="true" />
          Coding Profiles
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {dynamicProfileLinks.map((profile) => (
            <ProfileCard key={profile.name} profile={profile} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
          <BarChart2 className="w-5 h-5 text-amber-600" aria-hidden="true" />
          Activity Heatmaps
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <GithubHeatmapCard heatmap={githubData?.heatmap} isLoading={isGithubLoading} />
          {PLATFORM_HEATMAPS.map((platform) => (
            <PlatformHeatmapCard 
              key={platform.name} 
              platform={platform} 
              rawData={platformsData[platform.id]?.heatmap}
              isLoading={isPlatformsLoading}
            />
          ))}
        </div>
      </section>

      <section className={`${BASE_CARD_CLASSES} p-6`}>
        <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-6">Platform Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dynamicContestRanks.map((item) => (
            <ContestRankCard key={`${item.platform}-${item.title}`} item={item} isLoading={isPlatformsLoading} />
          ))}
        </div>
      </section>

      {}
      <section className={`${BASE_CARD_CLASSES} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-slate-800 dark:text-slate-100">Certificates & Achievements</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {isCertificatesLoading 
                ? "Loading your latest certifications..." 
                : "Add your certificates, badges, and completed programs here."}
            </p>
          </div>
          <Award className="w-5 h-5 text-amber-600" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isCertificatesLoading ? (
             Array.from({ length: 3 }).map((_, index) => (
               <CertificateSkeleton key={index} />
             ))
          ) : certificatesData.length > 0 ? (
            certificatesData.map((cert) => (
              <CertificateCard key={cert.title} cert={cert} />
            ))
          ) : (
            <p className="text-sm text-slate-500 col-span-full">No certificates found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Stats;