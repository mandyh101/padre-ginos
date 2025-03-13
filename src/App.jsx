import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Order from "./Order";
const App = () => {
  return (
    //* wrapping an app in StrictMode checks and gives you additional warnings about things you shouldn't be doing and also warns you if you are using features or packags that will be deprecated!
    <StrictMode>
      <div>
        <h1>Padre Gino's - order now</h1>
        <Order />
      </div>
    </StrictMode>
  );
};

const container = document.getElementById("root"); //first get the cdiv to render the app in
const root = createRoot(container); //set a root variable using reactDOM
root.render(<App />); //render the app to the root
