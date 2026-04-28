import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

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

		const token = jwt.sign(
			{ _id: user._id, isAdmin: user.isAdmin, email, password },
			process.env.JWT_SECRET
		);
		res.json({ isSuccess: true, message: 'Login Success', token });
	} catch (error) {
		console.log('res error', error);
		res.json({ isSuccess: false, message: error.message });
	}
};

export const loginAdmin = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userModel.findOne({ email });

		if (!user.isAdmin) {
			res.json({
				isSuccess: false,
				message: 'This account is not an admin',
			});
		}

		const token = jwt.sign(
			{ _id: user._id, isAdmin: user.isAdmin, email, password },
			process.env.JWT_SECRET
		);
		res.json({ isSuccess: true, message: 'Login Admin Success', token });
	} catch (error) {
		console.log('res error', error);
		res.json({ isSuccess: false, message: error.message });
	}
};

export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const exists = await userModel.findOne({ email });

		if (exists) {
			return res.json({ isSuccess: false, message: 'User exists' });
		}

		if (!validator.isEmail(email)) {
			return res.json({ isSuccess: false, message: 'Not Email' });
		}

		if (password.length < 8) {
			return res.json({ isSuccess: false, message: 'Weak password' });
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new userModel({
			name,
			email,
			password: hashedPassword,
		});

		const user = await newUser.save();

		const token = createToken(user._id);

		res.json({ isSuccess: true, message: 'Gen Token', token });
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
