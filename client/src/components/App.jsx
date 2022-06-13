import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
    let [notes, setNotes] = useState([]);

    function addNote() {
        axios
            .get("/api")
            .then((res) => {
                console.log(res.data);
                setNotes(res.data);
            });
    }

    function deleteItem(id) {
        axios
            .delete("/api", {data: {id: id}})
            .then((res) => {
                console.log(res.data);
                return (setNotes(res.data));
            });
    }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {notes.map((noteItem) => {
          return <Note onChange={addNote} key={noteItem._id} id={noteItem._id} title={noteItem.title} content={noteItem.content} deleteItem={deleteItem} />
      })}
      <Footer />
    </div>
  );
}

export default App;