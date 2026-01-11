import Note from "../models/Note.js";

export const getAllNotes = async(req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({message : "Error retrieving notes"});
  }
}

export const createNote = async(req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({message : "Error creating note", error: error.message});
  }
}

export const updateNote = async(req, res) => {
  try {
    const {title , content} = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if(!note){
      return res.status(404).json({message : "Note not found"});
    }
    res.status(200).json({message : "Note updated successfully" , note});
   }
    catch (error) {
    res.status(500).json({message : "Error updating note", error: error.message});
  }
}       

export const deleteNote = async(req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if(!note){
      return res.status(404).json({message : "Note not found"});
    }
    res.status(200).json({message : "Note deleted successfully"});
  } catch (error) {
    res.status(500).json({message : "Error deleting note", error: error.message});
  }
}

export const getNoteById = async(req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).json({message : "Note not found"});
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({message : "Error retrieving note", error: error.message});
  }
}