import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './CreateNotes.css'

function CreateNotes() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [subject, setSubject] = useState('');
    const [selectedCollaborators, setSelectedCollaborators] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user/getallusers');
                console.log('API Response:', response.data); 

                const formattedUsers = response.data.response.map((user) => ({
                    _id: user._id,
                    name: user.name, 
                }));

                setUsers(formattedUsers); 
            } catch (error) {
                console.error('Error fetching users:', error);
                setUsers([]); 
            }
        };

        fetchUsers();
    }, []);

    const handleCollaboratorChange = (event) => {
        const { value } = event.target;
        if (!selectedCollaborators.includes(value)) {
            setSelectedCollaborators((prev) => [...prev, value]);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user._id : null; 
    
        if (!userId) {
            alert("User not found. Please log in again.");
            return;
        }
    
        const newNote = {
            title,
            content,
            subject,
            createdBy: userId, 
            collaborators: selectedCollaborators,
        };
    
        try {
           
            const response = await axios.post('http://localhost:5000/user/createnote', newNote);
            alert("Note created successfully");
            console.log('Note created successfully:', response.data);
        } catch (error) {
            
            console.error('Error creating note:', error);
            alert('Failed to create note. Please try again later.');
        }
    };
    

    return (
        <div className='note-main'>
            <div className="note-form">
                <h2>Create a New Note</h2>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Content:</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Subject:</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Collaborators:</label>
                        <select onChange={handleCollaboratorChange} defaultValue="">
                            <option value="" disabled>Select Collaborators</option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.name} 
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <h4>Selected Collaborators:</h4>
                        <ul>
                            {selectedCollaborators.map((collaboratorId) => {
                                const collaborator = users.find((user) => user._id === collaboratorId);
                                return collaborator ? <li key={collaborator._id}>{collaborator.name}</li> : null; // Use 'name' instead of 'username'
                            })}
                        </ul>
                    </div>

                    <div>
                        <button type="submit">Add Note</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNotes