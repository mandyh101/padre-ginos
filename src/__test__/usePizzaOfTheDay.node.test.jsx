import { renderHook, waitFor } from "@testing-library/react";
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

// TEST WHAT WE EXPECT TO HAPPEN (THEN)
test("gives null when gives null when first called", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  const pizza = result.current;
  expect(pizza).toBeNull();
});

test("to call the API and give back the pizza of the day", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  // the waitFor hook allows us to wait for pizzaOfTheDay to be set as we know it doesn't happen straight away. It will keep trying to get the value until it gets it / or fails
  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });
  expect(fetchMocker).toHaveBeenCalledWith("/api/pizza-of-the-day");
});
