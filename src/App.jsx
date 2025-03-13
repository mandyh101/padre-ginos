import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

const App = () => {
  return (
    //* wrapping an app in StrictMode checks and gives you additional warnings about things you shouldn't be doing and also warns you if you are using features or packags that will be deprecated!
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

const container = document.getElementById("root"); //first get the cdiv to render the app in
const root = createRoot(container); //set a root variable using reactDOM
root.render(<App />); //render the app to the root
