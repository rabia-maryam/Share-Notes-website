const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      subject: { type: String },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
      collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model('Note', noteSchema);