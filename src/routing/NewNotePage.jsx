import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createNewNote } from "../redux/slices/notesSlice/notesActions"
import Button from "../util/Button"
import Input from "../util/Input"
import { selectUser } from "../redux/slices/userSlice/userSelectors"

function NewNote() {
  const [title, setTitle] = useState("")
  const navigation = useNavigate()
  const [noteText, setNoteText] = useState("")
  const user = useSelector(selectUser)
  const [titleError, setTitleError] = useState("")
  const dispatch = useDispatch()

  const handleCreateNote = () => {
    if (!title.trim()) {
      setTitleError("Title can't be empty");
      return;
    }
    dispatch(createNewNote(user.id, title, noteText))
    navigation("/notes")
  };

  return (
    <div className="sm:px-2 sm:gap-4 flex flex-col gap-8">
      <div className="sm:my-4 flex justify-center gap-12 items-center md:flex-col-reverse md:gap-2">
        <Button $to="/notes" $text="Back" />
        <p className="text-3xl font-bold mt-4">Create new note</p>
      </div>
      <Input
        $type="text"
        $placeholder="Title"
        $onDataChange={(value) => {
          setTitle(value);
          setTitleError("");
        }}
        $required={true}
      />
      {titleError && <div className="text-red-500">{titleError}</div>}
      <textarea
        onChange={(e) => setNoteText(e.target.value)}
        placeholder={"Enter some text"}
        className="border-2 border-black p-1"
        rows={5}
      />
      <Button $text="Create" $handleOnClick={handleCreateNote} />
    </div>
  );
}

export default NewNote;
