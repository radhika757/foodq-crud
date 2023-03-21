// Responsible for bringing actual list of meals to the screen
import React, { useState, useEffect } from "react";
import mealstyle from "./AvailableMeals.module.css";
import MealItem from "./MealItems/MealItem";
import Card from "../UI/Card";
import sushi from "../assets/lasagna.jpg";
import rice from "../assets/gelato.jpg";
import schnit from "../assets/schnitzel.jpg";
import salad from "../assets/salad.jpg";
import axios from "axios";
// an array of dummy meals (fetch this from a database)

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [allMeals, setAllMeals] = useState([]);

  // const getAllMeals = async
  const getMeals = async () => {
    await axios.get("http://localhost:3001/famous_meals").then((res) => {
      console.log(res.data);
      setMeals(res.data);
    });
    await axios.get("http://localhost:3001/getdata").then((res1) => {
      console.log(res1.data);
      setAllMeals(res1.data);
    });
  };
  useEffect(() => {
    getMeals();
  }, []);

  const favList = meals.map(
    (meal) => (
      // map all the meals by passing function to map which is executed for every meal
      <MealItem
        key={meal.meal_id}
        id={meal.meal_id}
        title={meal.meal_title}
        description={meal.meal_descr}
        price={meal.meal_price}
        img={salad}
      />
    )
    // returning a JSX element which represents this meal item.
  );

  const allMealList = allMeals.map((showAllMeals) => (
    <MealItem
        key={showAllMeals.meal_id}
        id={showAllMeals.meal_id}
        title={showAllMeals.meal_title}
        description={showAllMeals.meal_descr}
        price={showAllMeals.meal_price}
        img={salad}
      />
  ))
  return (
    <>
      <section className={mealstyle.meals}>
        <h3 className={mealstyle.order}>
          <i>Our most ordered cuisine</i>
        </h3>
        <ul>{favList}</ul>
      </section>
      <div className={mealstyle.allmenu}>
        <h2>
          <b>120 Dishes</b>
          
        </h2>
        {/* <h2>Veg/Non-veg</h2> */}
        <span className={mealstyle.border}></span>
        <div className={mealstyle['card-border']}>
         {allMealList}
        </div>
      </div>
    </>
  );
};

export default AvailableMeals;
