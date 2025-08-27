const router = require("express").Router();
const { generateAuthToken } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

module.exports = (db) => {
  const users = db.get("users");

  router.post("/", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }

      // Check if email exists
      const user = users.find({ email: req.body.email }).value();
      if (!user) {
        return res.status(401).send({ message: "Invalid Email or Password" });
      }

      // Compare hashed passwords
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(401).send({ message: "Invalid Email or Password" });
      }

      // Generate JWT token
      const token = generateAuthToken(user.id);
      res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  return router;
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};
