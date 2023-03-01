// Summary texts for recieps \
// We can use api to generate random food quotes on refresh
import React, { useEffect, useState } from "react";
import summarycss from "./MealSummary.module.css";
// import TextTransition, { presets } from "react-text-transition";

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
      {/* <h2>Discover best food and drinks in Mumbai!</h2>  */}
      <h2>
        {/* gentle, wobbly, stiff, slow, molasses */}
        {/* <TextTransition springConfig={presets.wobbly}>   */}{" "}
        {PHRASES[index % PHRASES.length]} {/* </TextTransition> */}
      </h2>
      {/* Instead of static mumbai, add different places and change using timer. */}
      <p>
        Choose from our broad range of cusines, enjoy freshly cooked meals
        anytime anywhere!Local as well as intra-city tasty food delivered to
        your food step in minutes!{" "}
      </p>
    </section>
  );
};

export default MealSummary;
