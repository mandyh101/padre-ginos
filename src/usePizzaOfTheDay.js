//* the function behind a custom hook is it's just a function that can call other functions
//* you know it's a hook if it starts with use
//* create a custom hook if an effect needs to be shared or tested e.g. here the pizza of the day will be imported in differnt pages in the app - hard sell!
//* a rule on hooks (applies to custom hooks and all hooks) - never place them inside conditionals as this will create unexpected beahviours.

import { useState, useEffect, useDebugValue } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

  //useDebugValue hook for debugging custom hooks at a glance in react dev tools
  useDebugValue(
    pizzaOfTheDay
      ? `debug value: ${pizzaOfTheDay.id} : ${pizzaOfTheDay.name}`
      : "loading",
  );

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/pizza-of-the-day`);
      const data = await response.json();
      setPizzaOfTheDay(data);
    }

    fetchPizzaOfTheDay();
  }, []);
  return pizzaOfTheDay;
};
