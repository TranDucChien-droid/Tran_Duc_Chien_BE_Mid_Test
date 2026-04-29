import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
	response.send('Work');
});

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.listen(port, async () => {
	console.log('Server started on PORT : ' + port);

	// await postModel.updateMany(
	// 	{}, // Find all documents
	// 	{ $set: { isAdmin: false } } // Set the new field and value
	// );
});
