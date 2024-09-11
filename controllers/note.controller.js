import Notes from '../models/Note.model.js'; // Adjust the import according to your project structure

// Get all notes
export const getNotes = async (req, res) => {
  const userId = req.userId
  try {
    const notes = await Notes.find({ userId });
    res.status(200).json({
      success: true,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single note by ID
export const getNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;


  // Validate MongoDB ObjectID
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      error: "Invalid note ID"
    });
  }

  try {
    //const note = await Notes.findById(id);
    const note = await Notes.findOne({ _id: id, userId });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'No note found or you do not have access'
      });
    }

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  const userId = req.userId
  try {
    const note = await Notes.create({
      ...req.body,
      userId
    });
    res.status(201).json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update a note by ID
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  // Validate MongoDB ObjectID
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      error: "Invalid note ID"
    });
  }

  try {
    // let note = await Notes.findById(id);
    let note = await Notes.findOne({ _id: id, userId });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'No note found or you do not have access'
      });
    }

    note = await Notes.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a note by ID
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;


  // Validate MongoDB ObjectID
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      error: "Invalid note ID"
    });
  }

  try {
    // const note = await Notes.findByIdAndDelete(id);
    const note = await Notes.findOneAndDelete({ _id: id, userId });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'No note found or you do not have access'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
