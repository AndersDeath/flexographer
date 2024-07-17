import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function checkFileType(file, cb) {
    const filetypes = /md/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (file.mimetype === 'application/octet-stream' && extname) {
        return cb(null, true);
    } else {
        cb('Error: Markdown Only!');
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})

export {upload}
