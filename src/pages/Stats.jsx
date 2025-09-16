import React, { useState, useEffect, useMemo } from "react";
import { GitPullRequest, Code, Star, Terminal } from "lucide-react";
import { FaGithub } from "react-icons/fa";

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
    };
  }
}

const StatCard = ({ stat }) => (
  <div className="p-4 bg-white rounded-xl shadow text-center">
    <stat.icon className="mx-auto mb-2" />
    <p className="text-xl font-bold">{stat.value}</p>
    <p className="text-xs text-gray-500">{stat.label}</p>
  </div>
);

const GithubHeatmap = ({ heatmap }) => (
  <div className="p-4 bg-white rounded-xl shadow">
    <div className="flex items-center gap-2 mb-3">
      <FaGithub />
      <h3 className="font-bold">GitHub Activity</h3>
    </div>
    <p className="text-sm text-gray-500">
      {heatmap.totalContributions} contributions
    </p>
  </div>
);

export default function Stats() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchGithubStats().then(setData);
  }, []);

  const stats = useMemo(() => {
    if (!data) return [];
    return [
      {
        label: "Total Contributions",
        value: data.stats.contributions,
        icon: GitPullRequest,
      },
      {
        label: "Code Volume",
        value: data.stats.codeVolumeLabel,
        icon: Code,
      },
      {
        label: "Public Repos",
        value: data.stats.publicRepos,
        icon: Terminal,
      },
      {
        label: "Stars",
        value: data.stats.stars,
        icon: Star,
      },
    ];
  }, [data]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Stats</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>

      <GithubHeatmap heatmap={data.heatmap} />
    </div>
  );
}