import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import { generateApiKey } from '../config/utils.js';

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userModel.findOne({ email });

		if (!user) {
			return res.json({
				isSuccess: false,
				message: 'User does not exist',
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.json({
				isSuccess: false,
				message: 'Wrong password',
			});
		}

		const { apiKey, randomString } = generateApiKey(user._id, email);

		user.apiKeyRandom = randomString;
		await user.save();

		res.json({ isSuccess: true, message: 'Login Success', apiKey });
	} catch (error) {
		console.log('res error', error);
		res.json({ isSuccess: false, message: error.message });
	}
};

export const registerUser = async (req, res) => {
	try {
		const { userName, email, password } = req.body;

		const exists = await userModel.findOne({ email });

		if (exists) {
			return res.json({ isSuccess: false, message: 'User with this email already exists' });
		}

		if (!validator.isEmail(email)) {
			return res.json({ isSuccess: false, message: 'Invalid email format' });
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new userModel({
			userName,
			email,
			password: hashedPassword,
		});

		const user = await newUser.save();

		res.json({ isSuccess: true, message: 'New Account Registered', user });
	} catch (error) {
		console.log('res error', error);
		res.json({ isSuccess: false, message: error.message });
	}
};

export const findAll = async (req, res) => {
	try {
		const exists = await userModel.find().exec();
		res.json({
			isSuccess: true,
			length: exists.length,
			message: 'Find All Success',
			data: exists,
		});
	} catch (error) {
		console.log('res error', error);
		res.json({ isSuccess: false, message: 'Error' });
	}
};
