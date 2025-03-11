const App = () => {
  return React.createElement(
    "div", //tag
    {}, //attributes
    React.createElement(
      "h1", //tag
      {}, //element
      "Padre Gino's" //content
    )
  )
}

const container = document.getElementById("root") //first get the cdiv to render the app in
const root = ReactDOM.createRoot(container) //set a root variable using reactDOM
root.render(React.createElement(App)) //render the app to the root