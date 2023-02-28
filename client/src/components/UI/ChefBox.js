import React from "react";
import boxstyle from "./ChefBox.module.css";
import ChefBoxContent from "./ChefBoxContent";


const ChefBox = () => {
  return (
    <React.Fragment>
      <div className={boxstyle.outline}>
       <ChefBoxContent />
      </div>
    </React.Fragment>
  );
};

export default ChefBox;
