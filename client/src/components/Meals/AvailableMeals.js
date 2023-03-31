// Responsible for bringing actual list of meals to the screen
import React, { useState, useEffect } from "react";
import mealstyle from "./AvailableMeals.module.css";
import MealItem from "./MealItems/MealItem";
import AllMealsList from "./MealItems/AllMealsList";
import salad from "../assets/salad.jpg";
import axios from "axios";
// an array of dummy meals (fetch this from a database)

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [vegOnly, setVegOnly] = useState(false);
  const [count, setCount] = useState(0);
  const [vegCount, setVegCount] = useState(0);

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

    await axios.get("http://localhost:3001/get_meal_count").then((res2) => {
      console.log(res2.data);
      setCount(res2.data);
    });

    await axios.get("http://localhost:3001/get_veg_count").then((response) =>{
      console.log(response.data);
      setVegCount(response.data);
    })
  };
  useEffect(() => {
    getMeals();
  }, []);

  // veg meals
  const getVegOnlyToggle = () => {
    setVegOnly(!vegOnly);
    setCount(vegCount);
    if (!vegOnly) {
      axios.get("http://localhost:3001/meals/veg").then((response) => {
        setAllMeals(response.data);
      });
    } else {
      getMeals();
    }
  };

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
  );

  const allMealList = allMeals.map((showAllMeals) => (
    <AllMealsList
      key={showAllMeals.meal_id}
      id={showAllMeals.meal_id}
      title={showAllMeals.meal_title}
      description={showAllMeals.meal_descr}
      price={showAllMeals.meal_price}
      img={salad}
    />
  ));
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
          <b>{count} Dishes</b>
          <div className="form-check form-switch">
            <input
              className="form-check-input "
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={vegOnly}
              onChange={getVegOnlyToggle}
            />
            <span className={mealstyle.filter}>Veg Only</span>
          </div>
        </h2>

        <span className={mealstyle.border}></span>
        <div className={mealstyle["card-border"]}>{allMealList}</div>
      </div>
    </>
  );
};

export default AvailableMeals;
