import React, { useState, useEffect, useMemo } from "react";
import {
  GitPullRequest,
  Code,
  Star,
  Terminal,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";
import {
  SiLeetcode,
  SiCodeforces,
  SiCodechef,
} from "react-icons/si";

const API_BASE_URL = "http://localhost:5000/api";

async function fetchGithubStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/github/stats`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return {
      stats: {
        contributions: 2451,
        codeVolumeLabel: "1.8M",
        publicRepos: 48,
        stars: 312,
      },
      heatmap: {
        totalContributions: 2451,
        weeks: [],
      },
      profile: {
        profileUrl: "https://github.com",
      },
    };
  }
}

async function fetchLeetCodeData() {
  try {
    const res = await fetch(`${API_BASE_URL}/stats/leetcode/stats`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return {
      profile: { profileUrl: "https://leetcode.com" },
      heatmap: {
        "2026-01-01": 3,
        "2026-01-02": 1,
      },
    };
  }
}

async function fetchCodeChefData() {
  try {
    const res = await fetch(`${API_BASE_URL}/stats/codechef/stats`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return {
      profile: { profileUrl: "https://codechef.com" },
      heatmap: {
        "2026-01-01": 2,
        "2026-01-02": 4,
      },
    };
  }
}

const StatCard = ({ stat }) => (
  <div className="p-4 bg-white rounded-xl shadow text-center">
    <stat.icon className={`mx-auto mb-2 ${stat.color}`} />
    <p className="text-xl font-bold">{stat.value}</p>
    <p className="text-xs text-gray-500">{stat.label}</p>
  </div>
);

const ProfileCard = ({ profile }) => (
  <a
    href={profile.url}
    target="_blank"
    rel="noopener noreferrer"
    className="p-4 bg-white rounded-xl shadow hover:shadow-md transition flex flex-col items-center"
  >
    <profile.icon className={`w-8 h-8 mb-2 ${profile.color}`} />
    <span className="text-sm font-semibold">{profile.name}</span>
  </a>
);

const PlatformHeatmap = ({ title, icon: Icon, data, color }) => {
  const grid = useMemo(() => {
    const entries = Object.entries(data || {});
    const max = Math.max(...entries.map(([, v]) => v || 0), 1);

    return entries.map(([date, count]) => ({
      date,
      count,
      intensity: Math.ceil((count / max) * 4),
    }));
  }, [data]);

  const colors = [
    "bg-gray-200",
    `${color}-200`,
    `${color}-400`,
    `${color}-600`,
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${color}-500`} />
        <h3 className="font-bold">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-1">
        {grid.map((d) => (
          <div
            key={d.date}
            className={`w-3 h-3 rounded-sm ${colors[d.intensity]}`}
            title={`${d.date}: ${d.count}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Stats() {
  const [github, setGithub] = useState(null);
  const [leetcode, setLeetcode] = useState(null);
  const [codechef, setCodechef] = useState(null);

  useEffect(() => {
    fetchGithubStats().then(setGithub);
    fetchLeetCodeData().then(setLeetcode);
    fetchCodeChefData().then(setCodechef);
  }, []);

  const stats = useMemo(() => {
    if (!github) return [];
    return [
      {
        label: "Contributions",
        value: github.stats.contributions,
        icon: GitPullRequest,
        color: "text-emerald-500",
      },
      {
        label: "Code Volume",
        value: github.stats.codeVolumeLabel,
        icon: Code,
        color: "text-orange-500",
      },
      {
        label: "Repos",
        value: github.stats.publicRepos,
        icon: Terminal,
        color: "text-amber-500",
      },
      {
        label: "Stars",
        value: github.stats.stars,
        icon: Star,
        color: "text-yellow-500",
      },
    ];
  }, [github]);

  const profiles = useMemo(
    () => [
      {
        name: "GitHub",
        url: github?.profile?.profileUrl,
        icon: FaGithub,
        color: "text-black",
      },
      {
        name: "LeetCode",
        url: leetcode?.profile?.profileUrl,
        icon: SiLeetcode,
        color: "text-orange-500",
      },
      {
        name: "Codeforces",
        url: "https://codeforces.com",
        icon: SiCodeforces,
        color: "text-blue-500",
      },
      {
        name: "CodeChef",
        url: codechef?.profile?.profileUrl,
        icon: SiCodechef,
        color: "text-amber-700",
      },
    ],
    [github, leetcode, codechef]
  );

  if (!github) return <p className="p-6">Loading...</p>;

  return (
    <div className="space-y-8 p-6">

      {}
      <h1 className="text-2xl font-bold">Dashboard Stats</h1>

      {}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>

      {}
      <div>
        <h2 className="font-bold mb-3">Coding Profiles</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {profiles.map((p) => (
            <ProfileCard key={p.name} profile={p} />
          ))}
        </div>
      </div>

      {}
      <div>
        <h2 className="font-bold mb-3">Platform Activity Heatmaps</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PlatformHeatmap
            title="LeetCode Activity"
            icon={SiLeetcode}
            data={leetcode?.heatmap}
            color="orange"
          />

          <PlatformHeatmap
            title="CodeChef Activity"
            icon={SiCodechef}
            data={codechef?.heatmap}
            color="amber"
          />

          <PlatformHeatmap
            title="GitHub Activity"
            icon={FaGithub}
            data={{}}
            color="gray"
          />
        </div>
      </div>

    </div>
  );
}