## Building package

Execute following command from the root folder to build the library. This creates a package in `dist` folder.
```sh
yarn install # for first time
yarn build
```

## Running test cases

The designated directory for tests is `/tests` folder. All tests will be run against the assertion present in the `/tests/__snapshot__` folder. To create this file you need to just run below command just once. Any update in the tests can be updated to by pressing `u` while the test environment is running.

Execute following command from the root folder to start testing.
```sh
yarn test:dev
```

## Running sample frontend Vue app

Please refer to the sample app `Readme.md` for details.

## Running sample backend server

Please refer to the sample app `Readme.md` for details.
