import multer from "multer";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,  crypto.randomBytes(16).toString("hex") + ".pdf");
    }
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const upload = multer({storage,filefilter});
export {upload}