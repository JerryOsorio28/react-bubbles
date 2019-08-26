import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";


const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  console.log('from BubblePage', props)
  useEffect(() => {
    axiosWithAuth()
    .get('http://localhost:5000/api/colors')
    .then(res => {console.log('from useEffect Hook')
      setColorList(res.data)
    })
    .catch(err => console.log(err.response))
  },[])


  return (
    <>
      <ColorList 
        colors={colorList} 
        updateColors={setColorList} 
        props={props}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
