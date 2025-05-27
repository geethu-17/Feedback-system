import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm() {
    const [text, setText] = useState('');

    const handleSubmit = async () => {
        if (!text) return alert("Please type feedback.");
        try {
            const res = await axios.post('http://localhost:5000/analyze', { text });
            alert(`Sentiment: ${res.data.sentiment}`);
            setText('');
        } catch (err) {
            console.error(err);
            alert("Error submitting feedback.");
        }
    };

    return (
        <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} cols={50} />
            <br />
            <button onClick={handleSubmit}>Submit Feedback</button>
        </div>
    );
}

export default FeedbackForm;
