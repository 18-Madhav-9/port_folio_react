const express = require('express');
const cors = require('cors');

const projectRoutes = require('./routes/project.routes');
const articleRoutes = require('./routes/article.routes');
const githubRoutes = require('./routes/github.routes'); 

const codeforcesRoutes = require("./routes/codeforces.routes");
const leetcodeRoutes = require("./routes/leetcode.routes");
const codechefRoutes = require("./routes/codechef.routes");
const contactRoutes = require("./routes/contact.routes")
const certificateRoutes = require("./routes/certificate.routes")

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/github', githubRoutes); 

app.use("/api/stats/codeforces", codeforcesRoutes);
app.use("/api/stats/leetcode", leetcodeRoutes);
app.use("/api/stats/codechef", codechefRoutes);
app.use('/api/contact', contactRoutes); 
app.use('/api/certificates', certificateRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

module.exports = app;