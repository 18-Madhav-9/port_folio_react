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
    if (!res.ok) throw new Error("Failed");
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

const StatCard = ({ stat }) => (
  <div className="p-4 bg-white rounded-xl shadow text-center hover:shadow-md transition">
    <stat.icon className={`mx-auto mb-2 ${stat.color}`} />
    <p className="text-xl font-bold">{stat.value}</p>
    <p className="text-xs text-gray-500">{stat.label}</p>
  </div>
);

const GithubHeatmap = ({ heatmap }) => (
  <div className="p-4 bg-white rounded-xl shadow">
    <div className="flex items-center gap-2 mb-3">
      <FaGithub className="text-black" />
      <h3 className="font-bold">GitHub Activity</h3>
    </div>
    <p className="text-sm text-gray-500">
      {heatmap?.totalContributions || 0} contributions
    </p>
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

export default function Stats() {
  const [githubData, setGithubData] = useState(null);

  useEffect(() => {
    fetchGithubStats().then(setGithubData);
  }, []);

  const stats = useMemo(() => {
    if (!githubData) return [];
    return [
      {
        label: "Total Contributions",
        value: githubData.stats.contributions,
        icon: GitPullRequest,
        color: "text-emerald-500",
      },
      {
        label: "Code Volume",
        value: githubData.stats.codeVolumeLabel,
        icon: Code,
        color: "text-orange-500",
      },
      {
        label: "Public Repos",
        value: githubData.stats.publicRepos,
        icon: Terminal,
        color: "text-amber-500",
      },
      {
        label: "GitHub Stars",
        value: githubData.stats.stars,
        icon: Star,
        color: "text-yellow-500",
      },
    ];
  }, [githubData]);

  const profiles = useMemo(
    () => [
      {
        name: "GitHub",
        url: githubData?.profile?.profileUrl || "https://github.com",
        icon: FaGithub,
        color: "text-black",
      },
      {
        name: "LeetCode",
        url: "https://leetcode.com",
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
        url: "https://codechef.com",
        icon: SiCodechef,
        color: "text-amber-700",
      },
    ],
    [githubData]
  );

  if (!githubData) return <p className="p-6">Loading...</p>;

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
      <GithubHeatmap heatmap={githubData.heatmap} />

      {}
      <div>
        <h2 className="text-lg font-bold mb-3">Coding Profiles</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {profiles.map((p) => (
            <ProfileCard key={p.name} profile={p} />
          ))}
        </div>
      </div>

    </div>
  );
}