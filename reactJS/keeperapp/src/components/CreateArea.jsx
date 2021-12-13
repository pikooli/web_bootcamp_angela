import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';

import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    if (!note.title || !note.content) return 
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
  }

  return (
    <div>
      <form className="create-note">
        {note.content ? <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />: null}
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="1"
        />
        {note.content ? 
        <Zoom in={true}>
          <Fab onClick={submitNote}><AddIcon/></Fab>
        </Zoom> : null
        }
      </form>
    </div>
  );
}

export default CreateArea;
