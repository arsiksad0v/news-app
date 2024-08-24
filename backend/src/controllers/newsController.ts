import { Request, Response } from 'express';
import News from '../models/newsModel';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(__dirname, '..', 'data', 'news.json');

let newsList: News[] = [];

if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    newsList = JSON.parse(data);
}

export const getNews = (req: Request, res: Response) => {
    const previewNews = newsList.map(({ id, title, date }) => ({
        id, title, date
    }));
    res.json(previewNews);
};

export const getNewsById = (req: Request, res: Response) => {
    const newsItem = newsList.find(n => n.id === req.params.id);
    if (newsItem) {
        res.json(newsItem);
    } else {
        res.status(404).json({ message: "News not found" });
    }
};

export const createNews = (req: Request, res: Response) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }
    const newNews: News = {
        id: uuidv4(),
        title,
        content,
        image,
        date: new Date().toISOString()
    };
    newsList.push(newNews);
    fs.writeFileSync(dataFilePath, JSON.stringify(newsList, null, 2));
    res.status(201).json(newNews);
};

export const deleteNews = (req: Request, res: Response) => {
    newsList = newsList.filter(n => n.id !== req.params.id);
    fs.writeFileSync(dataFilePath, JSON.stringify(newsList, null, 2));
    res.status(204).end();
};