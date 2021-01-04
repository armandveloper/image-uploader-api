require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { nanoid } = require('nanoid');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		optionsSuccessStatus: 200,
	})
);

const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public', 'uploads'),
	filename: (req, file, cb) => {
		cb(null, nanoid() + path.extname(file.originalname));
	},
});
app.use(multer({ storage }).single('image'));
app.use('/api', require('./routes/index.routes'));

app.listen(process.env.PORT, () =>
	console.log('Server listen on port:', process.env.PORT)
);
