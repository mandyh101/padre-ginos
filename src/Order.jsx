import { useState, useEffect } from "react";
import Pizza from "./pizza";

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

  let price, selectedPizza; //immutable, selectedPizza is always pizzaType from PizzaTypes, and price is always from selectedPizza

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizza.id === pizzaType);
    price = intl.format(
      selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
    );
  }
  console.log(price, pizzaSize);

  /**
   * ! this is the side effect function
   * Fetches the list of pizza types from the API.
   * Updates the component state with the fetched data.
   * Sets the loading state to false once the data is retrieved.
   */
  async function fetchPizzaTypes() {
    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();
    setPizzaTypes(pizzaJson);
    setLoading(false);
  }
  //* use useEffect to run our fecth function outside the render cycle so the function doesn't keep running everytime the component is rendered, ou only want it to run once at the start of mounting th component

  useEffect(() => {
    fetchPizzaTypes();
  }, []); //empty array means no variables tracked so this only ever runs once when the component is rendered, its not watching any variables

  console.log(selectedPizza);
  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              name="pizza-type"
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
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
  );
}
