import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../features/newsSlice';

const NewsList = () => {
    const dispatch = useDispatch();
    const news = useSelector((state: any) => state.news);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    return (
        <div>
            {news.map((item: any) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.date}</p>
                </div>
            ))}
        </div>
    );
};

export default NewsList;