import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
      console.log("-----------------------------------req please---------------",req.originalUrl)
        cb(null, req.originalUrl.substring(21).replace(/\//g, '-')+ ".pdf");
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