const fs = require('fs-extra');
const cloudinary = require('../config/cloudinary');

exports.uploadImage = async (req, res) => {
	try {
		const imageUploaded = await cloudinary.v2.uploader.upload(
			req.file.path
		);
		await fs.unlink(req.file.path);
		res.json({
			ok: true,
			message: 'Image was uploaded',
			url: imageUploaded.secure_url,
		});
	} catch (err) {
		console.log('Error:', err);
		res.json({
			ok: false,
			message: err.message,
		});
	}
};
