const db = {
  articles: [
    {
      id: 1,
      title: "Setting Up a C++ Development Environment",
      slug: "setting-up-a-cpp-development-environment",
      content: "# Setting Up a C++ Development Environment\n\nSetting up C++ properly is the first step toward writing efficient programs.\n\n## What You Need\n\n- A compiler (GCC, Clang, or MSVC)\n- A code editor (VS Code recommended)\n- Basic terminal access\n\n## Steps\n\n### 1. Install a Compiler\n- **Windows:** Install MinGW or use MSVC via Visual Studio\n- **macOS:** Install Xcode Command Line Tools\n- **Linux:** Install GCC using your package manager\n\n### 2. Verify Installation\n```bash\nc++ --version\n```\n\n### 3. Install a Code Editor\nRecommended: Visual Studio Code with C++ extensions\n\n### 4. Configure Your Project\nCreate a `.cpp` file and you're ready to start coding.",
      excerpt: "Learn how to properly set up a C++ development environment on Windows, macOS, and Linux.",
      coverImage: "https://images.unsplash.com/photo-1581090700227-1e8e0b1c2a3d?q=80&w=600",
      tags: ["C++", "Setup", "Programming"],
      createdAt: new Date(Date.now() - 864000000).toISOString(),
      updatedAt: new Date(Date.now() - 864000000).toISOString(),
      published: true
    },
    {
      id: 2,
      title: "Writing Your First C++ Program",
      slug: "writing-your-first-cpp-program",
      content: "# Writing Your First C++ Program\n\nOnce your environment is ready, it's time to write your first program.\n\n## Hello World in C++\n\n```cpp\n#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}\n```\n\n## How to Run It\n\n### Step 1: Compile\n```bash\nc++ main.cpp -o app\n```\n\n### Step 2: Execute\n```bash\n./app\n```\n\n## What You Learned\n- Basic structure of a C++ program\n- Using `iostream`\n- Compiling and running code from terminal",
      excerpt: "A beginner-friendly guide to writing and running your first C++ program.",
      coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600",
      tags: ["C++", "Beginner", "Programming"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: true
    }
  ],
  nextArticleId: 3
};

module.exports = db;