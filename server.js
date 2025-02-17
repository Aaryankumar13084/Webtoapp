const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('frontend'));

const upload = multer({ dest: 'uploads/' });

app.post('/generate-apk', upload.single('zipFile'), (req, res) => {
    let websiteUrl = req.body.websiteUrl;
    let zipPath = req.file ? req.file.path : null;

    let command = `python3 generate_apk.py "${websiteUrl}" "${zipPath || ''}"`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.json({ message: "Error generating APK" });
        }
        res.json({ message: "APK is being generated, check back soon!" });
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
