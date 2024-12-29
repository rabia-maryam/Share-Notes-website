const Note = require('../models/notesShema'); 

const getOneNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch note' });
    }
};


const updateNote = async (req, res) => {
    try {
        const { title, content, subject } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content, subject },
            { new: true, runValidators: true } // Options to return the new document and run validation
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json({ note: updatedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update note' });
    }
};

module.exports = {
    getOneNoteById,
    updateNote,
};
