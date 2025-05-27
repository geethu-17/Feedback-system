import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FeedbackList() {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/feedback')
            .then(res => setFeedbackList(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>All Feedback</h2>
            <ul>
                {feedbackList.map(f => (
                    <li key={f.id}>
                        {f.text} - <strong>{f.sentiment}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FeedbackList;
