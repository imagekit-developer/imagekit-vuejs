## Starting the frontend app
Create a .env file by renaming the sample.env in examples/sample-app. Fill in the required parameters according to your imagekit account.

Inside tests/test-app, run

```bash
yarn install
yarn serve
```

Open http://localhost:8080/ in the browser.

To use the upload component, you also will have to implement authenticationEndpoint as required during SDK initialization. This sample app has an example backend implementation.

## Setting up the backend server
Create a .env file by renaming the sample.env in `tests/test-app/server` and set the `PRIVATE_KEY`. Then run

```bash
yarn install
node server.js
```