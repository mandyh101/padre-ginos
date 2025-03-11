const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};
const App = () => {
  return React.createElement(
    "div", //tag
    {}, //attributes
    [
      React.createElement(
        "h2", //tag
        {}, //element
        "Padre Gino's", //content
      ),
      React.createElement(Pizza, {
        name: "Pepperoni",
        description: "Pepperoni",
      }),
      React.createElement(Pizza, {
        name: "Hawaiian",
        description: "Pineapple, Ham, Good vibes",
      }),
      React.createElement(Pizza, {
        name: "Margherita",
        description: "Tomato, Basil, Mozzarella",
      }),
    ],
  );
};

const container = document.getElementById("root"); //first get the cdiv to render the app in
const root = ReactDOM.createRoot(container); //set a root variable using reactDOM
root.render(React.createElement(App)); //render the app to the root
