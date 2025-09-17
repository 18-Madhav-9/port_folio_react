import React, { useState, useEffect, useMemo } from "react";
import {
  GitPullRequest,
  Code,
  Star,
  Terminal,
  Award,
  ExternalLink,
  Calendar,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";
import {
  SiLeetcode,
  SiCodeforces,
  SiCodechef,
} from "react-icons/si";

const API_BASE_URL = "http://localhost:5000/api";

/* -------------------- FETCH FUNCTIONS -------------------- */

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
      profile: {
        profileUrl: "https://github.com",
      },
      heatmap: {},
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

async function fetchCertificates() {
  try {
    const res = await fetch(`${API_BASE_URL}/certificates`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
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
      },
    ];
  }
}

/* -------------------- UI COMPONENTS -------------------- */

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

/* -------------------- HEATMAP -------------------- */

const PlatformHeatmap = ({ title, icon: Icon, data, color }) => {
  const grid = useMemo(() => Object.entries(data || []), [data]);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 text-${color}-500`} />
        <h3 className="font-bold">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-1">
        {grid.map(([date, count]) => (
          <div
            key={date}
            className={`w-3 h-3 rounded-sm ${
              count > 0 ? `bg-${color}-400` : "bg-gray-200"
            }`}
            title={`${date}: ${count}`}
          />
        ))}
      </div>
    </div>
  );
};

/* -------------------- CERTIFICATE CARD (NEW) -------------------- */

const CertificateCard = ({ cert }) => (
  <a
    href={cert.link}
    target="_blank"
    rel="noopener noreferrer"
    className="p-4 bg-white rounded-xl shadow hover:shadow-md transition group"
  >
    <div className="flex justify-between items-start mb-2">
      <Award className="text-amber-500" />
      <span className="text-xs text-gray-500 flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        {cert.date}
      </span>
    </div>

    <h4 className="font-bold group-hover:text-amber-600 transition">
      {cert.title}
    </h4>
    <p className="text-sm text-gray-500">{cert.issuer}</p>

    <div className="mt-3 text-xs text-amber-600 flex items-center gap-1">
      View Certificate <ExternalLink className="w-3 h-3" />
    </div>
  </a>
);

/* -------------------- MAIN COMPONENT -------------------- */

export default function Stats() {
  const [github, setGithub] = useState(null);
  const [leetcode, setLeetcode] = useState(null);
  const [codechef, setCodechef] = useState(null);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetchGithubStats().then(setGithub);
    fetchLeetCodeData().then(setLeetcode);
    fetchCodeChefData().then(setCodechef);
    fetchCertificates().then(setCertificates);
  }, []);

  /* -------------------- STATS -------------------- */
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

  /* -------------------- PROFILES -------------------- */
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

      {/* HEADER */}
      <h1 className="text-2xl font-bold">Dashboard Stats</h1>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>

      {/* PROFILES */}
      <div>
        <h2 className="font-bold mb-3">Coding Profiles</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {profiles.map((p) => (
            <ProfileCard key={p.name} profile={p} />
          ))}
        </div>
      </div>

      {/* HEATMAPS */}
      <div>
        <h2 className="font-bold mb-3">Activity Heatmaps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PlatformHeatmap
            title="LeetCode"
            icon={SiLeetcode}
            data={leetcode?.heatmap}
            color="orange"
          />
          <PlatformHeatmap
            title="CodeChef"
            icon={SiCodechef}
            data={codechef?.heatmap}
            color="amber"
          />
          <PlatformHeatmap
            title="GitHub"
            icon={FaGithub}
            data={github?.heatmap}
            color="gray"
          />
        </div>
      </div>

      {/* CERTIFICATES (NEW IN COMMIT 5) */}
      <div>
        <h2 className="font-bold mb-3">Certificates & Achievements</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <CertificateCard key={cert.title} cert={cert} />
          ))}
        </div>
      </div>

    </div>
  );
}