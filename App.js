import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [text, setText] = useState('');
    const [sentiment, setSentiment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!text.trim()) {
            alert("Please type feedback.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/analyze', {
                text: text.trim()
            });

            setSentiment(response.data.sentiment);
            setText('');
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
            <h2>Student Feedback Sentiment Analysis</h2>
            <textarea
                rows={4}
                cols={50}
                placeholder="Enter your feedback here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ padding: '10px', fontSize: '16px' }}
            />
            <br />
            <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: loading ? '#6c757d' : '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? "Analyzing..." : "Submit Feedback"}
            </button>
            {sentiment && (
                <div style={{ marginTop: '20px', fontSize: '18px' }}>
                    <strong>Sentiment:</strong> {sentiment}
                </div>
            )}
        </div>
    );
}

export default App;
