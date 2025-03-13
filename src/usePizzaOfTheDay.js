//* the function behind a custom hook is it's just a function that can call other functions
//* use this to create common functionality that can be used across different components
//* you know it's a hook if it starts with use

import { useState, useEffect } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      const response = await fetch("/api/pizza-of-the-day");
      const data = await response.json();
      setPizzaOfTheDay(data);
    }

    fetchPizzaOfTheDay();
  }, []);
  return pizzaOfTheDay;
};
