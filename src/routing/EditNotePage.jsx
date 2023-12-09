import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editNote
} from "../redux/slices/notesSlice/notesActions";
import {
  selectNote,
  selectNoteError,
  selectNoteLoading,
} from "../redux/slices/notesSlice/notesSelector";
import { selectUser } from "../redux/slices/userSlice/userSelectors";
import Button from "../util/Button";
import Input from "../util/Input";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate("");
  const [titleError, setTitleError] = useState("");
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const notes = useSelector(selectNote);
  const loading = useSelector(selectNoteLoading);
  let note = notes?.find((item) => item.id == id);

  const [title, setTitle] = useState(note?.title);
  const [text, setText] = useState(note?.text);

  const error = useSelector(selectNoteError);

  const handleEdit = () => {
    if (!title?.trim()) {
      setTitleError("Title can't be empty");
      return;
    }
    dispatch(editNote(id, title, text));
    navigate("/notes");
  };

  return (
    <div className="sm:px-2 sm:gap-4 flex flex-col gap-8">
      {!loading ? (
        !error && (
          <>
            <div className="sm:my-4 flex justify-center gap-12 items-center md:flex-col-reverse md:gap-2">
              <Button $to="/notes" $text="Back" />
              <p className="text-3xl font-bold mt-4">Edit note</p>
            </div>
            <Input
              $value={/*note?.*/ title}
              $type={"text"}
              $placeholder={"title"}
              $onDataChange={setTitle}
            />
            {titleError && <div className="text-red-500">{titleError}</div>}
            <textarea
              defaultValue={note?.text}
              onChange={(e) => setText(e.target.value)}
              placeholder={"Enter some text"}
              className="border-2 border-black p-1"
              rows={5}
            />
            <Button $text="Save" $handleOnClick={handleEdit} />
          </>
        )
      ) : (
        <p>Loading...</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
