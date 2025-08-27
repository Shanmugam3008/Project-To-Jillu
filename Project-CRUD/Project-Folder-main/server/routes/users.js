const router = require("express").Router();
const { generateAuthToken, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const axios = require("axios");

const JSON_SERVER_URL = "http://localhost:3000/users";

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		// Check if email exists
		const { data: users } = await axios.get(`${JSON_SERVER_URL}?email=${req.body.email}`);
		if (users.length > 0)
			return res.status(409).send({ message: "User with given email already exists!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const newUser = { ...req.body, password: hashPassword };
		await axios.post(JSON_SERVER_URL, newUser);

		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
