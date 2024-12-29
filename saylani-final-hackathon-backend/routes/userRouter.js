const express = require('express');
const { registerUser, loginVerification, getAllUsers } = require('../controller/userController');
const { createNote, getNoteById } = require('../controller/notesController');
const { getOneNoteById, updateNote } = require('../controller/notesEditController');
const routes = express.Router();

routes.post('/registerpost', registerUser);
routes.post('/loginverify', loginVerification);
routes.get('/getallusers', getAllUsers);
routes.post('/createnote', createNote);
routes.get('/getnotes/:userId', getNoteById);
routes.get('/updatenote/:id', getOneNoteById); 
routes.put('/updatenote/:id', updateNote); 

module.exports = routes;
