require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jsonServer = require("json-server");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// JSON Server setup (db.json as your DB)
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Expose raw json-server routes under /api/db
app.use("/api/db", middlewares, router);

// Import custom routes and inject db.json instance
const userRoutes = require("./routes/users")(router.db);  
const authRoutes = require("./routes/auth")(router.db);

// Custom routes use db.json as storage
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
