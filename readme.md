# Live Stream: OpenTok

Demo application for live streaming on the Web using OpenTok.


## Setting up

1. Clone repository and install dependencies.

  ```
  $ git clone https://github.com/arnellebalane/live-stream-opentok
  $ cd live-stream-opentok
  $ npm install
  ```

2. Create a TokBox project.

  1. Sign up for an account at [tokbox.com](https://tokbox.com).
  2. From your account dashboard, create a new project.

3. Setup API keys.
  At the root of the project directory, create a file named `.env`. Inside it place the following contents:

  ```
  OPENTOK_API_KEY=REPLACE_THIS_WITH_YOUR_OWN_API_KEY
  OPENTOK_API_SECRET=REPLACE_THIS_WITH_YOUR_OWN_API_SECRET
  ```

  You can find the values for your API key and secret from the TokBox project that you just created in the previous step.

4. Run the application server by running `npm start`. You can also use `npm run dev` to run the server using [nodemon](https://www.npmjs.com/package/nodemon) which auto-restarts the server whenever changes are made to it.
