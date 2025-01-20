import React, { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchNotes } from "../api/notes/fetchNotes";
import { useAddNote } from "../api/notes/addNote";
import { useUpdateNote } from "../api/notes/updateNote";
import { useDeleteNote } from "../api/notes/deleteNote";

function Notes() {
  const { data: notes = [], error, isLoading } = useFetchNotes();
  const addNoteMutation = useAddNote();
  const updateNoteMutation = useUpdateNote();
  const deleteNoteMutation = useDeleteNote();

  const updatedNote = useRef();

  const [newNote, setNewNote] = useState("");
  const [noteToUpdate, setNoteToUpdate] = useState(null);

  if (isLoading) return <p>Loading notes...</p>;

  if (error) return <p>Error loading notes: {error.message}</p>;

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      addNoteMutation.mutate(newNote);
      setNewNote("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (noteToUpdate !== null) {
      const inputValue = updatedNote.current.value;
      updateNoteMutation.mutate({ id: noteToUpdate, updatedNote: inputValue });
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="Modal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Change note content
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    New note:
                  </label>
                  <textarea
                    className="form-control"
                    ref={updatedNote}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h2>Your Notes</h2>

        <div className="mb-3 d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button className="btn btn-primary ms-2" onClick={handleAddNote}>
            Add
          </button>
        </div>

        <div className="list-group">
          {notes.length === 0 ? (
            <p>No notes available.</p>
          ) : (
            notes.map((note) => (
              <div
                className="list-group-item d-flex justify-content-between align-items-center"
                key={note.id}
              >
                <span
                  style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  {JSON.parse(note.note).content}
                </span>

                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#Modal"
                        onClick={() => {
                          setNoteToUpdate(note.id);
                        }}
                      >
                        Update
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => deleteNoteMutation.mutate(note.id)}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Notes;
