import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Delete from "../../public/images/delete.png";
import Edit from "../../public/images/edit.png";
import {
  deleteNote,
  getAllNotes,
} from "../redux/slices/notesSlice/notesActions";
import {
  selectNote,
  selectNoteError,
} from "../redux/slices/notesSlice/notesSelector";
import { selectUser } from "../redux/slices/userSlice/userSelectors";
import Button from "../util/Button";

export default function ViewNote() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const error = useSelector(selectNoteError);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getAllNotes(user.id));
  }, []);

  const notes = useSelector(selectNote);
  let note = notes?.find((item) => item.id == id);
  console.log(notes);

  return (
    <div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div>
            <div className="md:block md:my-8 flex justify-center gap-12 items-center mb-5">
              <Button $to="/notes" $text="Back"></Button>
              <p className="text-3xl font-bold break-all mt-4">{note.title}</p>
              <div className="flex mt-3">
                <NavLink to={`/notes/${note.id}/edit`}>
                  <div className=" w-7 h-7">
                    <img src={Edit}></img>
                  </div>
                </NavLink>
                <NavLink
                  to="/notes"
                  onClick={() => {
                    dispatch(deleteNote(id, user.id));
                  }}
                >
                  <div className=" w-7 h-7">
                    <img src={Delete}></img>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="p-2 min-h-max max-h-max text-left bg-slate-300">
              <textarea
                readOnly
                value={note.text}
                className="w-full h-80 break-words bg-transparent cursor-default resize-none outline-none"
              ></textarea>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
