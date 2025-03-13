import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Order from "./Order";
import PizzaOfTheDay from "./PizzaOfTheDay";
import Header from "./Header";
import { CartContext } from "./contexts";

const App = () => {
  const cartHook = useState([]);
  return (
    //* wrapping an app in StrictMode checks and gives you additional warnings about things you shouldn't be doing and also warns you if you are using features or packags that will be deprecated!
    <StrictMode>
      {/* NOTE: we use Provider on the end of our context to pass the value of our context to every component wrapped inside this tag. here, our whole app is wrapped in CartContext so every component will have access. If we only wanted the Order and PizzaOfTheDay to access the context we would only wrap those components */}
      {/* NOTE: in React 19 you can drop Provider! */}
      <CartContext.Provider value={cartHook}>
        <div>
          <Header />
          <Order />
          <PizzaOfTheDay />
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};

const container = document.getElementById("root"); //first get the cdiv to render the app in
const root = createRoot(container); //set a root variable using reactDOM
root.render(<App />); //render the app to the root
