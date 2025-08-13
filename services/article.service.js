const db = require('../data/article.data');
const { generateSlug } = require('../utils/slugify');

const getAllArticles = () => {
  return db.articles;
};

const getArticleByIdentifier = (identifier) => {
  const isId = !isNaN(identifier) && !isNaN(parseFloat(identifier));
  return db.articles.find(a => 
    isId ? a.id === parseInt(identifier) : a.slug === identifier
  );
};

const createArticle = (articleData) => {
  const { title, content, excerpt, coverImage, tags, published } = articleData;
  const now = new Date().toISOString();
  
  const newArticle = {
    id: db.nextArticleId++,
    title,
    slug: generateSlug(title),
    content,
    excerpt: excerpt || "",
    coverImage: coverImage || "",
    tags: Array.isArray(tags) ? tags : [],
    createdAt: now,
    updatedAt: now,
    published: published !== undefined ? published : false
  };

  db.articles.push(newArticle);
  return newArticle;
};

const updateArticle = (id, updateData) => {
  const articleIndex = db.articles.findIndex((a) => a.id === id);
  
  if (articleIndex === -1) return null;

  const existingArticle = db.articles[articleIndex];
  const slug = updateData.title ? generateSlug(updateData.title) : existingArticle.slug;

  db.articles[articleIndex] = {
    ...existingArticle,
    ...updateData,
    slug, // override slug if title changed
    updatedAt: new Date().toISOString()
  };

  return db.articles[articleIndex];
};

const deleteArticle = (id) => {
  const articleIndex = db.articles.findIndex((a) => a.id === id);
  
  if (articleIndex === -1) return null;

  const deletedArticle = db.articles.splice(articleIndex, 1);
  return deletedArticle[0];
};

module.exports = {
  getAllArticles,
  getArticleByIdentifier,
  createArticle,
  updateArticle,
  deleteArticle
};