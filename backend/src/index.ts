import express from 'express';
import newsRoutes from './routes/news';
import commentsRoutes from './routes/comments';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/news', newsRoutes);
app.use('/comments', commentsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${8000}`);
});