import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/notes').then((response) => {
      setNotes(response.data);
    });
  }, []);

  const addNote = () => {
    axios
      .post('http://localhost:5000/notes', { title, content })
      .then((response) => {
        setNotes([...notes, response.data]);
        setTitle('');
        setContent('');
      });
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:5000/notes/${id}`).then(() => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Notes App</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={addNote}>Add Note</button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesApp;
