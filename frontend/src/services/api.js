const API_BASE_URL = import.meta.env.VITE_API_URL;

const fetchFromAPI = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return null; 

  }
};

export const fetchProjectsFromBackend = async () => {
  const data = await fetchFromAPI("/projects");
  return data || [];
};

export const fetchArticlesFromBackend = async () => {
  const data = await fetchFromAPI("/articles");
  return data || [];
};

export const fetchGithubProfile = async () => {
  return await fetchFromAPI("/github/profile");
};

export const fetchGithubActivity = async () => {
  return await fetchFromAPI("/github/activity");
};

export const fetchGithubStats = async () => {
  return await fetchFromAPI("/github/stats");
};

export const fetchLeetCodeStats = async () => {
  return await fetchFromAPI("/stats/leetcode/stats");
};

export const fetchCodeforcesStats = async () => {
  return await fetchFromAPI("/stats/codeforces/stats");
};

export const fetchCodeChefStats = async () => {
  return await fetchFromAPI("/stats/codechef/stats");
};

export const fetchCertificates = async () => {
  const data = await fetchFromAPI("/certificates");
  return data || [];
};

export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to send message",
      };
    }

    return {
      success: true,
      ...data,
    };
  } catch (error) {
    console.error("API Error (/contact):", error);
    return {
      success: false,
      error: "Failed to send message",
    };
  }
};

export default fetchProjectsFromBackend;