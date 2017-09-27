import React from "react";
import { Route } from "react-router-dom";

const MainPage = (props) => {
  return (
    <div>
      { props.component }
    </div>
  );
};

export default MainPage;