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
    return browser
        .waitForElementVisible(elements.progress, browser.globals.waitForConditionTimeout)
        .getText(elements.progress, result => {
            for (let i = time.split(' ')[0]; i >= 1; i--) {
                browser.pause(1000, () => {
                    browser.getText(elements.progress, result => {
                        browser.assert.equal(result.value.split(' ')[0], i);
                    })
                })
            }
        })
},
```

The test is counting down in a for loop from the specified start time. It waits 1 second at `browser.pause(1000, ...)`
and then checks if the value displayed is the expected one.

## Bugs


* Timer display is delayed when on incognito/private browser window (reproducible in Chrome). Many times the UI is updated
with delays.

* Input validation is missing. For the non-handled input we get directly the `Time Expired!` message

* Changing context from `http` to `https` after clicking `GO!`

* When reaching the end (1 second), it takes 2-3 seconds until it actually displays the Time Expired! message.

* Changing options on the modal is not saved when clicking `Apply`