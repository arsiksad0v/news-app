import { Router } from 'express';
import multer from 'multer';
import { getNews, getNewsById, createNews, deleteNews } from '../controllers/newsController';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getNews);
router.get('/:id', getNewsById);
router.post('/', upload.single('image'), createNews);
router.delete('/:id', deleteNews);

export default router;