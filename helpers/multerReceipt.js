var multer = require('multer')

const storageConfig = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, './receipt')
    },
    filename: (req,file,cb) => {
        cb(null, 'REC-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})

const filterConfig = (req,file,cb) => {
    if(file.mimetype.split('/')[1] === 'png' || file.mimetype.split('/')[1] === 'jpeg'){
        cb(null, true)
    } else {
        cb(new Error('Image must be jpeg / png ') , false)
    }
}

var upload = multer({storage : storageConfig , fileFilter : filterConfig, limits :{fileSize : 2000 * 1024}})

module.exports = upload