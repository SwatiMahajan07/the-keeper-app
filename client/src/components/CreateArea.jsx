import React, { useState } from "react";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from "axios";

function CreateArea(props) {
    let [note, setNote] = useState({
        title: "",
        content: ""
    });
    let [checkClick, setCheckClick] = useState(false);

    function handleChange(event) {
        let {name, value} = event.target;
        setNote((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function textAreaClicked() {
        if(checkClick === false) {
            setCheckClick(!checkClick)
        }
    }

    function submitNote(event) {
        axios
            .post("/api", note)
            .then((res) => {
                console.log(res.data);      
            });

        setNote({
            title: "",
            content: ""
        });

        props.addNote();
        console.log(note);
        
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={submitNote} className="create-note">
                {checkClick && <input autoFocus onChange={handleChange} name="title" placeholder="Title" value={note.title}/>}
                <textarea onClick={textAreaClicked} onChange={handleChange} name="content" placeholder="Take a note..." rows={checkClick ? "3" : "1"} value={note.content} />
                <Zoom in={checkClick && true}>
                    <Fab type="submit" >Add</Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;