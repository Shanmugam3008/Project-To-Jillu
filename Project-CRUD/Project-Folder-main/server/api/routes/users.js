const router = require("express").Router();
const { generateAuthToken, validate } = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = (db) => {
  const users = db.get("users");
  const isProduction = process.env.NODE_ENV === "production";

  router.post("/", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send({ message: error.details[0].message });

      // Check if email exists
      const existingUser = users.find({ email: req.body.email }).value();
      if (existingUser) return res.status(409).send({ message: "User already exists!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = { ...req.body, password: hashPassword };

      if (!isProduction) {
        // Local only: persist
        users.push(newUser).write();
      } else {
        console.log("Skipping db.json write in production (Vercel)");
      }

      res.status(201).send({
        message: isProduction
          ? "User created (mock only, not persisted)"
          : "User created successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  return router;
};
