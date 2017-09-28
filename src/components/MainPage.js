import React from "react";
import ParcialPosts from "./Posts/ParcialPosts.js"

const MainPage = (props) => {
  return (
    <div>
        <ParcialPosts setId={props.setId} abrirModal={props.open} />
    </div>
  );
};

export default MainPage;