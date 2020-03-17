This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

Run the following commands from your shell.

### Getting the SDK ready

We will first go to the root,

```js
cd ../../
```

Install the node modules,
```js
npm install
```

Create the dist:

```js
npm run build
```

### Installing the sample-app

Now, Go to `sample-app` by,
```js
cd example/sample-app
```

then,
```
npm install
```
This should create a copy of `imagekitio-vue` library in `node_modules` of `sample-app`

## Setting the environment variable
Create a .env file by renaming the sample.env in examples/sample-app

Fill is the required parameters according to your imagekit account.

## Starting the app
Finally run the app,
```
npm run serve
```

To run the upload component you also will have set up a server

## Setting up the server
There is a sample server present in the sample app directory in server directory. To run this server, go to server directory,

```cd server```, then run

```js
npm install

npm run server
```
It takes the `private key` from .env file, so create a .env file by renaming the sample.env in `examples/sample-app/server`
