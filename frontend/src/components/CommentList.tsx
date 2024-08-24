import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../features/commentsSlice';

const CommentList = ({ newsId }: { newsId: string }) => {
    const dispatch = useDispatch();
    const comments = useSelector((state: any) => state.comments);

    useEffect(() => {
        dispatch(fetchComments(newsId));
    }, [dispatch, newsId]);

    return (
        <div>
            {comments.map((comment: any) => (
                <div key={comment.id}>
                    <p>{comment.author}: {comment.text}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentList;