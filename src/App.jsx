import { createRoot } from "react-dom";
import Pizza from "./pizza";
import Order from "./Order";
const App = () => {
  return (
    <div>
      <h1>Padre Gino's - order now</h1>
      <Order />
    </div>
  );
};

const container = document.getElementById("root"); //first get the cdiv to render the app in
const root = createRoot(container); //set a root variable using reactDOM
root.render(<App />); //render the app to the root
