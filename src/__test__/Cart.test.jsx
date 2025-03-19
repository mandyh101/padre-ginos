//testing snapshot testing
//snapshot testing renders out the entire component and tests that it matches a snapshot of the component that it has taken
//e.g. Cart looks like X, re-render it and does it still look like X?
//best for dumb display components - not super popular anymore
// can break and don't tell us super helpful info

import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";

test("snapshot with nothing in cart", () => {
  const { asFragment } = render(<Cart cart={[]} />);
  expect(asFragment()).toMatchSnapshot();
});
