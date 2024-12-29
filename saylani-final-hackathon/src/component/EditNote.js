// EditNote.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateNotes.css'

function NoteForm() {
    const navigate = useNavigate();
    const { noteId } = useParams(); 
    const [note, setNote] = useState({ title: '', content: '', subject: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/updatenote/${noteId}`); // Corrected route
                if (!response.ok) {
                    throw new Error('Failed to fetch note');
                }
                const data = await response.json();
                setNote(data.note); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [noteId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNote(prevNote => ({ ...prevNote, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/user/updatenote/${noteId}`, { // Corrected route
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(note), 
            });
            if (!response.ok) {
                throw new Error('Failed to update note');
            }
            navigate('/'); 
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading note...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='note-main'>
            <div className='note-form'>
                <h2>Edit Note</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type='text'
                            name='title'
                            value={note.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Content:</label>
                        <textarea
                            name='content'
                            value={note.content}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Subject:</label>
                        <input
                            type='text'
                            name='subject'
                            value={note.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type='submit'>Update Note</button>
                </form>
            </div>
        </div>
    );
}

export default NoteForm;