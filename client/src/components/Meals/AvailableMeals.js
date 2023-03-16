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
// an array of dummy meals ( we can fetch this from a database)
// const dummy_meals = [
//   {
//     id: "m1",
//     name: "Lasagne",
//     description: "Creamy Pasta",
//     price: 22.9,
//     img: sushi,
//   },

//   {
//     id: "m2",
//     name: "Brodetto",
//     description: "Fish soup",
//     price: 33.3,
//     img: schnit,
//   },

//   {
//     id: "m3",
//     name: "Gelato",
//     description: "Local flavors",
//     price: 20.22,
//     img: rice,
//   },
//   {
//     id: "m4",
//     name: "Salad",
//     description: "Something Green",
//     price: 26.0,
//     img: salad,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const getAllMeals = async () => {
    await axios.get("http://localhost:3001/famous_meals").then((res) => {
      console.log(res.data);
      setMeals(res.data);
    });
  };
  useEffect(() => {
    getAllMeals();
  }, []);

  const mealsList = meals.map(
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
 
  return (
    <section className={mealstyle.meals}>
      <h3 className={mealstyle.order}><i>Our most ordered cuisine</i></h3>
      <ul>{mealsList}</ul> 
    </section>
  );
};

export default AvailableMeals;
