import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Pizza from "../Pizza";

test("alt text renders on pizza image", async () => {
  //Given
 const name = "My Favorite Pizza";
 const src = "https://picsum.photos/200";

 //When
 // - screen is a built in variable from testing library with in built functions such as getByRole, which we use below
 const screen = render(
  <Pizza name={name} description="super cool pizza" image={src} />
 );
 const img = screen.getByRole("img");

 // Then
 expect(img.src).toBe(src);
 expect(img.alt).toBe(name);
}  
)