import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
import Pizza from "../Pizza";

//! This is very important because screen is not stateful and if we are running multiple test cases, we can get errors such as: TestingLibraryElementError: Found multiple elements with the role "img"
//the below ceans up the screen state after every test
afterEach(cleanup);

test("alt text renders on pizza image", async () => {
  //Given
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";

  //When
  // - screen is a built in variable from testing library with in built functions such as getByRole, which we use below
  const screen = render(
    <Pizza name={name} description="super cool pizza" image={src} />,
  );
  const img = screen.getByRole("img");

  // Then
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});

test("pizza image has a default image if none is provided", async () => {
  const screen = render(
    <Pizza name="Cool Pizza" description="super cool pizza" />,
  );
  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
});
