import { Request, Response } from 'express';
import Comment from '../models/commentModel';
import News from '../models/newsModel';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(__dirname, '..', 'data', 'comments.json');
const newsFilePath = path.join(__dirname, '..', 'data', 'news.json');

let commentList: Comment[] = [];

if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    commentList = JSON.parse(data);
}

export const getComments = (req: Request, res: Response) => {
    const newsId = req.query.news_id as string;
    const comments = newsId
        ? commentList.filter(c => c.newsId === newsId)
        : commentList;
    res.json(comments);
};

export const createComment = (req: Request, res: Response) => {
    const { newsId, text, author } = req.body;
    if (!newsId || !text) {
        return res.status(400).json({ message: "News ID and text are required" });
    }
    if (!fs.existsSync(newsFilePath)) {
        return res.status(404).json({ message: "News not found" });
    }
    const newComment: Comment = {
        id: uuidv4(),
        newsId,
        text,
        author: author || "Anonymous",
    };
    commentList.push(newComment);
    fs.writeFileSync(dataFilePath, JSON.stringify(commentList, null, 2));
    res.status(201).json(newComment);
};

export const deleteComment = (req: Request, res: Response) => {
    commentList = commentList.filter(c => c.id !== req.params.id);
    fs.writeFileSync(dataFilePath, JSON.stringify(commentList, null, 2));
    res.status(204).end();
};