// __root.jsx = what code does every route in the app share

import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PizzaOfTheDay from "../PizzaOfTheDay";
import Header from "../Header";
import { CartContext } from "../contexts";

export const Route = createRootRoute({
  //give the root route what to expect:
  component: () => {
    const cartHook = useState([]);
    //NOTE: we use Provider on the end of our context to pass the value of our context to every component wrapped inside this tag. here, our whole app is wrapped in CartContext so every component will have access. If we only wanted the Order and PizzaOfTheDay to access the context we would only wrap those components */}
    //NOTE: in React 19 you can drop Provider! */}
    return (
      <>
        <CartContext.Provider value={cartHook}>
          <div>
            <Header />
            {/* outlet is where the pages/components that are dynamic will be swapped out by each child route */}
            <Outlet />
            <PizzaOfTheDay />
          </div>
        </CartContext.Provider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
