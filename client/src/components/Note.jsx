import React from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Note(props) {
    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={() => {
                props.deleteItem(props.id);
            }} ><DeleteOutlineIcon /></button>
        </div>
    )
};

export default Note;