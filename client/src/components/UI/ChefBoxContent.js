import React from "react";
import contentstyles from "./ChefBoxContent.module.css";
import chefimg from "../assets/chef.jpg";

const ChefBoxContent = () => {
  return (
    <React.Fragment>
      <div className={contentstyles.content}>
        <img alt="chef-img" src={chefimg} />

        <div className={contentstyles.brief}>
          <h4>Head-Chef</h4>
          <h5>Gabriel</h5>
          <p>
            Meet our adventurous Chef who is not afraid to try new dishes or
            flavors and then incorporate those flavors into our best dishes!
            Gabriel makes his own bread and can conjure a meal at a momemnt's
            notice using egss from our hens and herbs from our garden
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChefBoxContent;
