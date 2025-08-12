// Structured to be easily swappable with MongoDB later
const db = {
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A fully responsive e-commerce platform built with React, Node.js, and Stripe for seamless payments.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80",
      link: "https://example.com/project1",
      github: "https://github.com/username/ecommerce-platform"
    },
    {
      id: 2,
      title: "Task Management Tool",
      description: "A drag-and-drop task board for remote teams, utilizing WebSockets for real-time collaboration updates.",
      image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=600&q=80",
      link: "https://example.com/project2",
      github: "https://github.com/username/task-management"
    }
  ],
  nextId: 3
};

module.exports = db;