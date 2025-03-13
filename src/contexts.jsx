import { createContext } from "react";
//* the intention of this file is to contain all of ouur app contexts
//* Context and the hook useContext is for APP LEVEL STATE (careful not to overuse). User would be an example of app level state that you'd want to persist between pages and not lose when different components or pages are destroyed when the page changes.
//* in this example, we are using the cart as the state to persist so that if the user navigates away from the order page, they don't lose the pizzas fromt heir cart (buy baby buy)
//* the below commented code is an example of what a hook is destrcuture, an array, that canotains an array and a function. we pass it into createContext
// const hook = [[], function () {}];
export const CartContext = createContext([[], function () {}]);
