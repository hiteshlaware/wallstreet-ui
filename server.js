const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Rewrite routes to match Spring Boot API conventions
server.use(jsonServer.rewriter({
  '/api/accounts': '/accounts'
}));

// Use default router
server.use(router);

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}/api/accounts`);
});
