# Pizza restaurant (React v9)

A follow along project with Front End Masters and Brian Holt to refresh over core concepts of React following a first-principles methodlogy, starting with no build tools, avanilla JS and React and adding tools as wek go. I am working on this project as part of the Frontend Masters Professional Pathway.

## A reflection on the project:
Despite having experience with React, starting with bare-bones and adding packages only as needed gave me such a fresh perspective. What I loved most was realising that understanding fundamentals can make you more intentional! Not every trendy hook belongs in your project 🫨 I think simpler IS better! Knowing the basics helps you see when you're just adding bulk vs when a technique truly optimises your code.

Oh! And the course covers Tanstack Query and Router too. I'm fast becoming a fan girl.

Such a good reminder that revisiting basics is not a waste of time! 

## Getting started
This app runs on vite, react19, and uses tanstack query and tanstack router. Also running tests with vitest!

### To run website:

- `npm run dev` will start your local server through vite
- `npm run build` to test the build

## Client App Deployment

This website is hosted on Netlify: https://mandy-padre-ginos.netlify.app/ (can be a bit slow, I think it's a free tier and far away server thing).

### Deploy commands are pretty straightforward:
- what is not straightforward is that I am currently deployiing from production branch instead of main... see ## cautionary notes below.
- `npm i`
- `npm run build`


## Server app
Server app code here: https://github.com/mandyh101/padre-ginos-server-app/

## Cautionary notes
I had to roll this project back and do some crazy things to get back to react 18 without confused dependency's breaking my build! So, production code is shipped to the production branch. Which I hope to fix eventually and return to a more normal flow of deploying from main once the trauma fades :D 


