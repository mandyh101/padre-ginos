import { render } from "@testing-library/react";
import {expect, test, vi} from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy"; // the route api that we want to test

//first create an instace of the query client that we will use to test posting to the api?
const queryClient = new QueryClient({});

const fetchMocker = createFetchMock(vi); //vi is the name of the spy libray in vitest, it spies on what gets called, what functions it gets called with etc.
fetchMocker.enableMocks(); // doesn't actually call the api but mocks that it has so we can spy on it

test("can submit contact form", async () => {
  //*GIVEN
  //mock that we have called the api and the api has responded with a 200 status code
  fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));
  const screen = render(
    <QueryClientProvider client={queryClient}>
      {/* structuring the route component like this instead of simply like Route, means we strip out all the tanstack router extra stuff in our app to just load the component */}
      <Route.options.component /> 
    </QueryClientProvider>,
  );

  //now we simulate out user input events here
  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const msgTextArea = screen.getByPlaceholderText("Message");

  const testData = {
    name: "Mandy",
    email: "test@example.com",
    message: "This is a test message",
  };

  nameInput.value = testData.name;
  emailInput.value = testData.email;
  msgTextArea.value = testData.message;
  const submitButton = screen.getByRole("button");

  //*WHEN
  submitButton.click();

  //*THEN
  //use await here because we know that an h3 with text will show on successful submit, but it doesn't show right away and the await tells the test to wait until it does or fail 
  const h3 = await screen.findByRole("heading", { level: 3 });
  expect(h3.innerText).toContain("Submitted"); //use to contain to avoid exact match fails e.g. missing the !
  //lets alos check that the api was called with the right data
  const requests = fetchMocker.requests();
  expect(requests.length).toBe(1)
  expect(requests[0].url).toBe('/api/contact')
  //this last expect test is getting close to implementation details that might be unneccesary to test
  expect(fetchMocker).toHaveBeenCalledWith('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })

})