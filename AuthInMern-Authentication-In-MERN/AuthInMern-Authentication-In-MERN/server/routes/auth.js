const router = require("express").Router();
const { generateAuthToken } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const axios = require("axios");

const JSON_SERVER_URL = "http://localhost:3000/users";

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const { data: users } = await axios.get(`${JSON_SERVER_URL}?email=${req.body.email}`);
		if (users.length === 0)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const user = users[0];
		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = generateAuthToken(user.id);
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
