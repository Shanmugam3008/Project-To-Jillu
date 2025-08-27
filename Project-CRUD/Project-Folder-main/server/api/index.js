require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jsonServer = require("json-server");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Setup JSON server (read-only in production)
const router = jsonServer.router("api/db.json"); // path corrected
const middlewares = jsonServer.defaults();
app.use("/api/db", middlewares, router);

// Import custom routes
const userRoutes = require("./routes/users")(router.db);
const authRoutes = require("./routes/auth")(router.db);

// Custom routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 8080;

// Local dev only
if (!isProduction) {
  app.listen(port, () => console.log(`Listening on port ${port}...`));
}

// Export for Vercel
module.exports = app;
