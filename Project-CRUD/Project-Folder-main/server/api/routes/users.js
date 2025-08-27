const router = require("express").Router();
const { generateAuthToken, validate } = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = (db) => {
  const users = db.get("users");

  router.post("/", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }

      // Check if email already exists
      const existingUser = users.find({ email: req.body.email }).value();
      if (existingUser) {
        return res.status(409).send({ message: "User with given email already exists!" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = { ...req.body, password: hashPassword };

      // Save to db.json
      users.push(newUser).write();

      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  return router;
};
