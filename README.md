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

For running the test I configured 2 commands, one to run tests sequentially and one to run tests in parallel.
Both can be called from the command line in the `mrsk-test` root folder.

`npm run tests`

`npm run tests-parallel` (it will by default run the tests 3 in parallel at the feature level)

## Highlights

The most interesting part is the countdown and assert code:

```
countDownAndAssert(browser, time) {
    browser
        .waitForElementVisible(elements.progress, 45000)
        .getText(elements.progress, result => {
            for (let i = time; i >= 1; i--) {
                browser.pause(1000, () => {
                    browser.getText(elements.progress, result => {
                        browser.assert.equal(result.value, i);
                    })
                })
            }
        })
    },
```