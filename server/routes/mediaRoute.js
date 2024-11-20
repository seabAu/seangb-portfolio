
import express from 'express';

const router = express.Router();
import auth from "../middleware/auth.js";
import * as C from "../controllers/mediaController.js";
import { upload } from '../middleware/multer.js';

// All paths are prefixed by "/api/media": app.use( "/api/media", mediaRoute );


// Upload media.
// router.post('/upload', upload.array('files'), C.uploadMedia);
router.post('/uploadM', C.uploadMedia);
router.post('/upload', upload.array('files'), C.uploadMedia);

// Edit file details.
router.put( '/:id', C.editMediaDetails );

// Delete a file.
router.delete('/:id', C.deleteMedia);

// Fetch specific file by id. 
router.get( '/:id', C.fetchMedia );

// Fetch all media (indiscriminate)
router.get('/', C.fetchAllMedia);

// Fetch files matching a given filter mask.
router.get('/filter', C.fetchFilteredMedia);

export default router;
