import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import Delete from "../../public/images/delete.png"
import Edit from "../../public/images/edit.png"
import { deleteNote, getAllNotes } from "../redux/slices/notesSlice/notesActions"
import { selectNote, selectNoteLoading } from "../redux/slices/notesSlice/notesSelector"
import { selectUser } from "../redux/slices/userSlice/userSelectors"
import Button from "../util/Button"

export default function Notes() {

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  useEffect(() => {
    dispatch(getAllNotes(user.id))
  }, [])

  let data = useSelector(selectNote)
  const loading = useSelector(selectNoteLoading)

  const handleDeleteNote = id => {
    dispatch(deleteNote(id, user.id))
   // location.reload()
  }

  if (!Array.isArray(data)) {
    data = [data]
  }

  return (
    <div>
      <p className="text-4xl font-bold mb-5">Notes</p>
      <Button $to="/notes/create" $text="Add a new note" />
      {!loading ? data[0] ? data
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((note) => (
          <NavLink key={note.id} to={`/notes/${note.id}/view`}>
            <div
              key={note.id}
              className="flex bg-slate-300 items-start p-5 my-5 sm:mx-4 rounded-lg sm:p-3 justify-between"
            >
              <div className="flex items-center break-all text-left">
                <p className="h-auto max-w-3xl">
                  <b>{note.title}</b>
                </p>
              </div>
              <div className="flex gap-4 static mt-auto">
                <p className="h-auto font-thin">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
                <div className="flex">
                  <object>
                    <NavLink to={`/notes/${note.id}/edit`}>
                      <div className=" w-7 h-7">
                        <img src={Edit}></img>
                      </div>
                    </NavLink>
                  </object>
                  <object>
                    <NavLink
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <div className=" w-7 h-7">
                        <img src={Delete}></img>
                      </div>
                    </NavLink>
                  </object>
                </div>
              </div>
            </div>
          </NavLink>
        )) : <p className="mt-10">Empty...</p> : <div> <p>Loading...</p> </div>}
    </div>
  )
}
