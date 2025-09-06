const articleService = require('../services/article.service');

const getArticles = (req, res) => {
  const articles = articleService.getAllArticles();
  res.status(200).json(articles);
};

const getArticleByIdentifier = (req, res) => {
  const identifier = req.params.identifier;
  const article = articleService.getArticleByIdentifier(identifier);

  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }
  res.status(200).json(article);
};

const createArticle = (req, res) => {
  const { title, content, excerpt, coverImage, tags, published } = req.body;

  if (!title || !content) {
    return res.status(400).json({ 
      error: "Please provide both 'title' and 'content' for the article." 
    });
  }

  const newArticle = articleService.createArticle(req.body);
  res.status(201).json(newArticle);
};

const updateArticle = (req, res) => {
  const articleId = parseInt(req.params.id);
  const updatedArticle = articleService.updateArticle(articleId, req.body);

  if (!updatedArticle) {
    return res.status(404).json({ error: "Article not found" });
  }

  res.status(200).json(updatedArticle);
};

const deleteArticle = (req, res) => {
  const articleId = parseInt(req.params.id);
  const deletedArticle = articleService.deleteArticle(articleId);

  if (!deletedArticle) {
    return res.status(404).json({ error: "Article not found" });
  }

  res.status(200).json({ 
    message: "Article deleted successfully", 
    article: deletedArticle 
  });
};

module.exports = {
  getArticles,
  getArticleByIdentifier,
  createArticle,
  updateArticle,
  deleteArticle
};