const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

function generateAuthToken(userId) {
	return jwt.sign({ _id: userId }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
}

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { generateAuthToken, validate };
