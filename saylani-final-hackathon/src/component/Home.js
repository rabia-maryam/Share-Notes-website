// Home.js
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Home() {
    const navigate = useNavigate();
    const [ownerUser, setOwnerUser] = useState(null);
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            if (parsedUser && parsedUser.name) {
                setOwnerUser(parsedUser);
                fetchNotes(parsedUser._id); 
            }
        }
    }, []);

    const fetchNotes = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/user/getnotes/${userId}`); 
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            const data = await response.json();
            setNotes(data.notes); 
        } catch (err) {
            console.log(err) 
        } 
    };

    const handleLogout = () => {
        alert('Logged out successfully');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); 
    };

   
    const filteredNotes = notes.filter(note =>
        note.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='main-container'>
            <nav>
                <h1>{ownerUser?.name || 'User'}</h1>
                {ownerUser ? (
                    <div className='nav-btn-div'>
                        <button className='nav-btn' onClick={() => { navigate('/') }}>Notes</button>
                        <button className='nav-btn' onClick={handleLogout}>LogOut</button>
                    </div>
                ) : (
                    <div className='nav-btn-div'>
                        <button className='nav-btn' onClick={() => { navigate('/register') }}>Register</button>
                        <button className='nav-btn' onClick={() => { navigate('/login') }}>Login</button>
                    </div>
                )}
            </nav>

            <div className='search-div'>
                <input
                    type='search'
                    placeholder='Search for any Notes'
                    className='search-input'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <i className="fas fa-plus plus-icon" onClick={() => { navigate('/createnotes') }} />
            </div>

            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4 " style={{color:'rgb(149, 70, 255)'}}>User Notes</h2>
                {filteredNotes.length === 0 ? (
                    <p>No notes found for this user.</p>
                ) : (
                    <ul className="grid grid-cols-1 gap-4"> 
                        {filteredNotes.map(note => (
                            <li key={note._id} className="note-box"> 
                                <div className="note-title"> 
                                    <p className="font-bold"><span>Title: </span>{note.title}</p>
                                </div>
                                <div className="note-content"> 
                                    <p><span>Content: </span>{note.content}</p>
                                </div>
                                <div className="note-subject"> 
                                    <p className="text-sm text-gray-500"><span>Subject: </span>{note.subject}</p>
                                </div>
                                <button className='edit-btn' onClick={() => navigate(`/editnote/${note._id}`)}>Edit</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Home;