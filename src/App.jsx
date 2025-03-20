import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();
const App = () => {
  return (
    //* wrapping an app in StrictMode checks and gives you additional warnings about things you shouldn't be doing and also warns you if you are using features or packags that will be deprecated!
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
};

const container = document.getElementById("root"); //first get the cdiv to render the app in
const root = createRoot(container); //set a root variable using reactDOM
root.render(<App />); //render the app to the root
