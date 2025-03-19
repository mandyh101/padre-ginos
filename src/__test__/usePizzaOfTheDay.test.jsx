import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../usePizzaOfTheDay";

//SET UP THE DATA (GIVEN)
const fetchMocker = createFetchMock(vi); //vi is the name of the spy libray in vitest, it spies on what gets called, what functions it gets called with etc.
fetchMocker.enableMocks(); // doesn't actually call the api but mocks that it has so we can spy on it

const testPizza = {
  id: "calabrese",
  name: " The Calabrese Pizza",
  category: "Supreme",
  description: "A classic pizza topped with tomatoes, mozzarella, and basil.",
  image: "/public/pizzas/calabrese.webp",
  size: {
    S: 12.25,
    M: 16.25,
    L: 20.25,
  },
};

//FAKE CUSTOM HOOK CALL (WHEN)
function getPizzaOfTheDay() {
  let pizza;

  //here we are faking a component that doesn't do anything except return null so we can test callig the custom hook without side effects
  function TestComponent() {
    pizza = usePizzaOfTheDay();
    return null;
  }

  render(<TestComponent />);

  return pizza;
}

// TEST WHAT WE EXPECT TO HAPPEN (THEN)
test("gives null when gives null when first called", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));
  const pizza = getPizzaOfTheDay();
  expect(pizza).toBeNull();
});
