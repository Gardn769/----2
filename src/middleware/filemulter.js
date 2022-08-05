const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb){
        // console.log(123);
        cb(null, './storage')
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

module.exports = multer({storage})