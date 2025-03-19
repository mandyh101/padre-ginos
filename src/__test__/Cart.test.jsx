//testing snapshot testing
//snapshot testing renders out the entire component and tests that it matches a snapshot of the component that it has taken
//e.g. Cart looks like X, re-render it and does it still look like X?
//best for dumb display components, that are UI focused and aren't likley to change - not super popular anymore
// can break and don't tell us super helpful info

import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";

//example testing a component display
test("snapshot with nothing in cart", () => {
  const { asFragment } = render(<Cart cart={[]} />);
  expect(asFragment()).toMatchSnapshot();
});

//example of using snapshots to test that the api returns data in the expected format
test("api returns data in expected format", () => {
  //expect the result you want to get back to the user
  expect({
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
  }).toMatchSnapshot();
});
