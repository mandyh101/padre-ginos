import { createRoot } from "react-dom";
import Pizza from "./pizza";

const App = () => {
 return(
  <div>
    <h1>Padre Gino's - order now</h1>
    <Pizza name="Pepperoni" description="Peperroni, Cheese, Tomato" image="public/pizzas/pepperoni.webp"/>
    <Pizza name="Hawaiian" description="Pineapple, Ham, Aloha" image="public/pizzas/hawaiian.webp"/>
    <Pizza name="Meat lovers" description="All the meat" image="public/pizzas/big_meat.webp"/>
  </div>
 )
};

const container = document.getElementById("root"); //first get the cdiv to render the app in
const root = createRoot(container); //set a root variable using reactDOM
root.render(<App/>); //render the app to the root
