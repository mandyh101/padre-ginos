import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import Header from "../Header";
import {
  RouterProvider,
  createRouter,
  createRootRoute,
} from "@tanstack/react-router";
import { CartContext } from "../contexts";

test("correctly renders a header with a zero cart count", async () => {
  const rootRoute = createRootRoute({
    component: () => (
      <CartContext.Provider value={[[]]}>
        <Header />
      </CartContext.Provider>
    ),
  });

  const router = createRouter({ routeTree: rootRoute });
  const screen = render(<RouterProvider router={router}></RouterProvider>);

  const itemsInCart = await screen.getByTestId("cart-number");

  await expect.element(itemsInCart).toBeInTheDocument();
  await expect.element(itemsInCart).toHaveTextContent("0");
});

test("correctly renders a header with a three cart count", async () => {
  // to make tanstack happy , make a root route for the test
  const rootRoute = createRootRoute({
    component: () => (
      // because our cart gets it cart value from the context, we have to pass the cart value in as a context for our test too
      <CartContext.Provider
        value={[[{ pizza: 1 }, { pizza: 2 }, { pizza: 3 }]]}
      >
        <Header />
      </CartContext.Provider>
    ),
  });
  const router = createRouter({ routeTree: rootRoute });
  const screen = render(<RouterProvider router={router}></RouterProvider>);

  const itemsInCart = await screen.getByTestId("cart-number");

  await expect.element(itemsInCart).toBeInTheDocument();
  await expect.element(itemsInCart).toHaveTextContent("3");
});
