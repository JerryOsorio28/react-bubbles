import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, props, setColorList }) => {
  console.log('from colorList', props);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  // console.log(colorToEdit)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  useEffect(() => {

      const id = props.match.params.id;
      console.log('ID', id)

      const colorsList = colors.find( color => `${color.id}` === id);

    if(colorsList) setColorToEdit(colorsList)
  }, [colors, props.match.params.id])

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit) 
      .then(res => {console.log('axios from saveEdit', res)
        setColorList(props.match.params.id)
      })
      // .catch(err => console.log(err. response))
  };
  
  const removeColor = id => {
    setColorList(colorToEdit.filter(color => color.id !== id))
  }

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log('colortoDelete', color)

    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`, color)
        .then( res => {console.log('axios from deleteColor', res)
          deleteColor(color.id)
        })
        .catch(err => console.log(err.response))
  };


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
