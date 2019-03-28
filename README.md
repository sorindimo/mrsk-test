# mrsk-test

Solution using NightwatchJS & CucumberJS to test the e.ggtimer UI.

Tools used:

* `http://nightwatchjs.org/`

* `https://github.com/cucumber/cucumber-js`

* `https://github.com/mucsi96/nightwatch-cucumber`

## Functionality covered by tests

* the main timer countdown feature

* special timers

* the timer options modal


## Building and running the tests

It is required to have `node` and `npm` installed

All the dependencies that will be installed can be found in `package.json`

For installation run the command: `npm install` in the `mrsk-test` root folder.

For running the test I configured 2 commands, one to run tests sequentially and one to run tests in parallel:

`npm run tests`

`npm run tests-parallel` (it will by default run the tests 3 in parallel at the feature level)
