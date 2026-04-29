import userModel from '../models/userModel.js';
import { parseApiKey } from '../config/utils.js';

export const userMiddleware = async (req, res, next) => {
	try {
		const { apiKey } = req.query;

		if (!apiKey) {
			return res.json({ isSuccess: false, message: 'apiKey is required' });
		}

		const parsedApiKey = parseApiKey(apiKey);
		if (!parsedApiKey) {
			return res.json({ isSuccess: false, message: 'Invalid apiKey format' });
		}

		const { userId, email, randomString } = parsedApiKey;

		const userExists = await userModel.findOne({ _id: userId, email });
		if (!userExists) {
			return res.json({ isSuccess: false, message: 'User not found or not logged in' });
		}

		if (userExists.apiKeyRandom !== randomString) {
			return res.json({ isSuccess: false, message: 'Invalid or expired apiKey' });
		}

		req.user = userExists;

		next();
	} catch (error) {
		res.json({ isSuccess: false, message: error.message });
	}
};
