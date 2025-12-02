import multer from "multer";
import path from "path";
// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the directory where files will be stored
        cb(null, 'uploads/'); // The 'uploads' folder we created in backend/
        console.log(file);

    },
    filename: (req, file, cb) => {
        console.log(file);

        // Generate a unique filename to prevent overwriting
        // e.g., 'image-1678888888888.jpeg'
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

// Configure Multer to handle single file uploads
// 'headerImage' is the name of the input field in your HTML form
const Uploader = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {

        // Only allow image files
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images (jpeg, jpg, png, gif) are allowed!'));
    },

});

export default Uploader; // Export the configured Multer instance