// Summary texts for recieps \
// We can use api to generate random food quotes on refresh
import React, { useEffect, useState } from "react";
import summarycss from "./MealSummary.module.css";


const PHRASES = [
  "Unexpected guests?",
  "Movie marathon?",
  "Cooking gone wrong?",
  "Game night?",
  "Hungry?",
];

const MealSummary = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearTimeout(interval);
  }, []);

  return (
    <section className={summarycss.summary}>
      <h2>
        {/* gentle, wobbly, stiff, slow, molasses */}
      
        {PHRASES[index % PHRASES.length]} {/* </TextTransition> */}
      </h2>
    
      <p>
        Choose from our broad range of cusines, enjoy freshly cooked meals
        anytime anywhere!Local as well as intra-city tasty food delivered to
        your food step in minutes!{" "}
      </p>
    </section>
  );
};

export default MealSummary;
