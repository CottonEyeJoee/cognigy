# Cognigy Frontend Developer Coding Challenge

![Preview of the chatbot app](/screenshot/preview.png)

## Requirements :clipboard:

- [x] Written in Typescript

- [x] Connects to a predefined existing Cognigy.AI bot

- [x] Features a _"text input"_ field with a _"send"_ buttom

  - [x] Both _"clicking the send button"_ and _"hitting return"_ submit the users message

- [x] Messages sent/recieved using the [Cognigy.AI Socket-Client](https://github.com/Cognigy/SocketClient)

- [x] All messages visually rendered in a chat history with _"message bubbles"_

## Additional Features :fire:

- [x] Using custom bundler ([esbuild](https://esbuild.github.io/))

- [x] Loading animation while websocket is connecting

- [x] Error message when the websocket throws an error

- [x] Scrolls to the bottom of the chat window when a new message is displayed

- [x] Theme switch for dark and light mode

## Tooling :toolbox:

| Package                                  | Description                                                                                           |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `[react, react-dom]`                     | A JavaScript library for building user interfaces [(Github)](https://github.com/facebook/react)       |
| `[redux, react-redux, @reduxjs/toolkit]` | Adaptation of the flux state managment for react [(Github)](https://github.com/reduxjs/redux)         |
| `[@mui/material, @mui/icons-material]`   | Material UI library [(Github)](https://github.com/mui/material-ui)                                    |
| `@cognigy/socket-client`                 | Cognigy chatbot websocket , you find more information [here](https://github.com/Cognigy/SocketClient) |
| `esbuild`                                | High performance bundler [(esbuild documentation)](https://esbuild.github.io/)                        |
| `dotenv`                                 | Enviroment variables library [(Github)](https://github.com/motdotla/dotenv)                           |
| `jest`                                   | Unit testing library [(Github)](https://github.com/facebook/jest)                                     |

## Setup :magic_wand:

1. Open the terminal in the root directory & execute `yarn install` (`npm i`)

1. Create an `.env' file in the root directory and add the following variables to this file using the credentials given in the code challenge instructions (don't forget to save the file)

   ```env
   API_ENDPOINT_URI={websocket-endpoint}
   API_TOKEN={websocket-token}
   ```

1. In the terminal execute `yarn start` (`npm start`) in the root directory

## TODO :construction:

- [ ] Refine dark colour theme

- [ ] Setup Hot Reload

- [ ] Improve performance (reduce rerender)

- [ ] Embed external font/SVG files locally

## Known Bugs :lady_beetle:

- When a new message is displayed containing an image URL, scrolling down is inconsistent due to the nature of images loaded via external URLs

## Scripts :scroll:

### `yarn install`

Installs the project's dependencies specifies in package.json.

### `yarn start`

This script runs as follow:

1. Creates a server through `esbuild.serve()`. This serves the bundled files at **http://localhost:8080/serve/**.

2. Creates a development server that serves files at **public folder** then `index.html` consumes the files serve by **http://localhost:8080/serve/**. Development server runs at **http://localhost:3000**

### `yarn test`

Runs your tests files through **Jest**, you could specify a path or a regex that **Jest** runs your test against them eg: `yarn test src/components/any-component/index.test.js` in this case **Jest** runs at this path only.

### `yarn build`

Creates an optimized bundle ready to be deployed.
