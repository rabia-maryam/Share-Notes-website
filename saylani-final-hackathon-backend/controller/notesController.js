const User = require('../models/userSchema');
const Note = require('../models/notesShema');

const createNote = async (req, res) => {
  try {
    const { title, content, subject, collaborators, createdBy } = req.body; 
    if (!createdBy) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const newNote = await Note.create({
      title,
      content,
      subject,
      createdBy, 
      collaborators,
    });

    await User.findByIdAndUpdate(createdBy, { $push: { notes: newNote._id } });

    if (collaborators?.length) {
      await User.updateMany(
        { _id: { $in: collaborators } },
        { $push: { notes: newNote._id } }
      );
    }

    res.status(201).json({ message: 'Note created successfully', note: newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create note' });
  }
}

const getNoteById = async (req, res) => {
    try {
        const { userId } = req.params; 
    
       
        const notes = await Note.find({
          $or: [
            { createdBy: userId }, 
            { collaborators: userId } 
          ]
        });
    
        if (notes.length === 0) {
          return res.status(404).json({ message: 'No notes found for this user.' });
        }
    
        res.status(200).json({ notes });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve notes' });
      }
  };

module.exports = { createNote , getNoteById};
