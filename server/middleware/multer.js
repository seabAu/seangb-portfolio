import multer from "multer";

const fileDestination = 'uploads/';
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, fileDestination);
    },
    filename: ( req, file, cb ) =>
    {
        const user = req.body.user;
        const type = req.body.type;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/svg+xml',
        'video/webm',
        'application/pdf',
        'image/tiff',
        'image/tga',
        'audio/mp3',
        'video/mp4',
        'audio/m4a',
        'audio/wav',
        'text/plain'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

export const upload = multer( {
    storage: storage,
    // fileFilter: fileFilter,
    // limits: {
    //     fileSize: 1024 * 1024 * 25, // Max file size 25MB
    // },
} );

const deleteFile = (file) => {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err);
        throw new Error("Gagal menghapus file");
      }
    });
};
  
/*
import multer from "multer";

// Set storage.
// const fileDestination = 'uploads';
var storage = multer.diskStorage( {
    destination: function ( req, file, cb )
    {
        cb( null, fileDestination );
    },
    name: function ( req, file, cb )
    {
        // image.jpg -> Grab the ".jpg"
        var extension = file.originalname.substr( file.originalname.lastIndexOf( '.' ) );
        var newFileName = file.filename + "-" + Date.now();
        cb( null, newFileName );
    }
} );

store = multer( { storage: storage } );

export default store;
// export default store = multer( { storage: storage } );
*/