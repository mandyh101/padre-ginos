import { useState, useEffect, useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import Pizza from "../Pizza";
import Cart from "../Cart";
import { CartContext } from "../contexts";

//create the route, first arg is path and then pass in any other args stated in the route root, ./__root.jsx expects a component arg
export const Route = createLazyFileRoute("/order")({ component: Order });
const apiUrl = import.meta.env.VITE_API_URL;

const intl = new Intl.NumberFormat("en-NZ", {
  style: "currency",
  currency: "NZD",
});

//* Named functions show up in the stack trace which can be helpful for debugging. Arrow functions as anon functions won't show up. Not super important but interesting!
//* two way binding is not free in react - enter useState hook to set and update component state
//* the useEffect hook is used to do something (an effect) as soon as a component is rendered: component renders, effect runs
export default function Order() {
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  //* this is where our cart context is being updated in our app - important to understand where context is being modified as oppoesed to where it is just being shown
  const [cart, setCart] = useContext(CartContext);

  async function checkout() {
    setLoading(true);
    await fetch(`${apiUrl}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });
    //runs when the await completes
    setCart([]);
    setLoading(false);
  }

  let price, selectedPizza; //immutable, selectedPizza is always pizzaType from PizzaTypes, and price is always from selectedPizza

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizza.id === pizzaType);
    price = intl.format(
      selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
    );
  }

  /**
   * ! this is the side effect function
   * Fetches the list of pizza types from the API.
   * Updates the component state with the fetched data.
   * Sets the loading state to false once the data is retrieved.
   */
  async function fetchPizzaTypes() {
    const pizzaRes = await fetch(`${apiUrl}/api/pizzas`);
    const pizzaJson = await pizzaRes.json();
    setPizzaTypes(pizzaJson);
    setLoading(false);
  }
  //* use useEffect to run our fecth function outside the render cycle so the function doesn't keep running everytime the component is rendered, ou only want it to run once at the start of mounting th component
  useEffect(() => {
    fetchPizzaTypes();
  }, []); //empty array means no variables tracked so this only ever runs once when the component is rendered, its not watching any variables

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCart([
              ...cart,
              { pizza: selectedPizza, size: pizzaSize, price },
            ]);
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                name="pizza-type"
                value={pizzaType}
                onChange={(e) => setPizzaType(e.target.value)}
              >
                {/*interesting note on using key, tying key tot he index is not stable and is not good practice as it is not actually related to the object being mapped like an id is for example. So use a related value on the object, or if it doesn't matter if data gets reorganised you can use index with all this in mind! */}
                {pizzaTypes.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    checked={pizzaSize === "S"}
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "M"}
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "L"}
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          <div className="order-pizza">
            {loading ? (
              <h2>Loading pizzas...</h2>
            ) : (
              <>
                <Pizza
                  name={selectedPizza.name}
                  description={selectedPizza.description}
                  image={selectedPizza.image}
                />
                <p>{price}</p>
              </>
            )}
          </div>
        </form>
      </div>
      {loading ? <h2>LOADING …</h2> : <Cart checkout={checkout} cart={cart} />}
    </div>
  );
}
