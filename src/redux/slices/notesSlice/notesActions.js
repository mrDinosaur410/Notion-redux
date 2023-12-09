import API from "../../../util/ApiFetch";

export const getNoteById = (id) => async (dispatch) => {
  dispatch({ type: "NOTES/REQUEST/PENDING" });
  try {
    const note = await API.getNote(id);
    dispatch({ type: "NOTES/REQUEST/FULFILLED", payload: note });
  } catch (error) {
    dispatch({ type: "NOTES/REQUEST/REJECTED", payload: error.message });
  }
};

export const getAllNotes = (userId) => async (dispatch) => {
  dispatch({ type: "NOTES/REQUEST/PENDING" });
  try {
    const notes = await API.getNotes(userId);
    console.log(notes);
    dispatch({ type: "NOTES/REQUEST/FULFILLED", payload: notes });
  } catch (error) {
    dispatch({ type: "NOTES/REQUEST/REJECTED", payload: error.message });
  }
};

export const createNewNote = (userId, title, text) => async (dispatch) => {
  dispatch({ type: "NOTES/REQUEST/PENDING" });
  try {
    const note = await API.createNote(userId, title.trim(), text);
    dispatch({ type: "NOTES/REQUEST/FULFILLED", payload: note });
  } catch (error) {
    dispatch({ type: "NOTES/REQUEST/REJECTED", payload: error.message });
  }
};

export const deleteNote = (id, userId) => async (dispatch) => {
  dispatch({ type: "NOTES/REQUEST/PENDING" });
  try {
    await API.deleteNote(id);
    const notes = await API.getNotes(userId);
    dispatch({ type: "NOTES/REQUEST/FULFILLED", payload: notes });
  } catch (error) {
    dispatch({ type: "NOTES/REQUEST/REJECTED", payload: error.message });
  }
};

export const editNote = (id, title, text) => async (dispatch) => {
  dispatch({ type: "NOTES/REQUEST/PENDING" });
  try {
    const note = await API.editNote(id, title.trim(), text);
    dispatch({ type: "NOTES/REQUEST/FULFILLED", payload: note });
  } catch (error) {
    dispatch({ type: "NOTES/REQUEST/REJECTED", payload: error.message });
  }
};
