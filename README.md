<img src="public/demo1.png" alt="Flow-builder" title="Chatbot Flow Builder" width="100%" />
<img src="public/demo2.png" alt="Flow-builder" title="Chatbot Flow Builder" width="100%" />

This is a instagram stories feature made with Typescript, NextJS and Tailwind css.
Jest is used for testing

## Demo Link

[Live Demo](https://insta-stories-wine.vercel.app)

## Features

- List of stories visible in a smaller view in a horizontally scrollable list.
- List is of different users having multiple / single stories
- The user can continue watching the same story from where they have left it lastly.
- Stories automatically advance to the next one after a set duration defined from backend in

```
/src/app/shared/components/storiesList.tsx
```

you can also set the number of users coming from api

- The user can navigate between stories by click left / right
- Optimizations like lazyloading image / component, aborting api call, having cleanup functions is there
  Note: I could have used react query (tanstack) for better caching api but it was single api so haven't done it, also image optimization is missing

## Demonstration

https://drive.google.com/file/d/1WLsiAnfsItzrg0qED3tJe_rIgCAXcImf/view?usp=sharing

### Dev Requirements

- [Next.js](https://nextjs.org/) 14 or later

---

## Quick Start Guide for Developers

`git clone [repository]`

- Clone the repository

`cd [directory]`

- CD into Directory

`npm install`

- Installs all dependencies

`npm run dev`

- Runs in dev mode.
- Viewable in browser via localhost:3000/

- Run test
  `npm run test`

- Backend api is inside /src/pages/api/stories.ts
  `api/stories`

---

## Config and Code Structure

Typescript or application code in `app/`directory.
