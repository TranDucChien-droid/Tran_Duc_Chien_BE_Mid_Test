import jwt from 'jsonwebtoken';

export const adminAuth = async (req, res, next) => {
	try {
		const { token } = req.headers;

		if (!token) {
			return res.json({ isSuccess: false, message: 'Unauthorized' });
		}

		const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!token_decode.isAdmin) {
			return res.json({ isSuccess: false, message: 'Unauthorized not an admin' });
        }

        next();
	} catch (error) {
		res.json({ isSuccess: false, message: error.message });
	}
};
