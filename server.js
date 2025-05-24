const express = require('express');
const fileUpload = require('express-fileupload');
const PDFLib = require('pdf-lib');
const { PDFDocument } = require('pdfkit');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'https://filebae.onrender.com' })); // Allow requests from your front-end domain
app.use(fileUpload());
app.use(express.static('public'));

app.post('/api/pdf-to-image', async (req, res) => {
    if (!req.files || !req.files.pdf) {
        return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const pdfFile = req.files.pdf;
    const format = req.body.format || 'png';
    const dpi = parseInt(req.body.dpi) || 150;
    const pages = req.body.pages ? req.body.pages.split(',').map(p => p.trim()) : [];

    res.json({ message: 'PDF converted to images', format, dpi, pages });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
