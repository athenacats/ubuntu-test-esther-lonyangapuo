# Ubuntu Take Home Test

The project was completed using Vanilla Framework pulling data from the WordPress API provided.

## Issues encountered

When using @canonical/react-components, dev server would fail on compilation due to an issue with "lodash/isEqual" in the node modules. The workaround I found to work was to surround this "require" call with a try/catch block to handle this failure at run-time instead of bundle-time. The error occurred whether I used Nextjs or Vite.

## How to get started

Clone the repository

Run:
1. `npm install`
2. `yarn start` or `npm start`

Alternatively, view the live version here: [Vercel App](https://ubuntu-test-esther-lonyangapuo.vercel.app/)
