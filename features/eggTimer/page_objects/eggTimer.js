const elements = {
    timerInput: '#start_a_timer',
    goButton: '#timergo',
    optionsBeta: '#timer > div > a',
    progress: '#progressText',
    optionsModal: '#options'
};

const commands = [
    {
        enterTime(browser, time) {
            browser.waitForElementVisible(elements.timerInput, 45000);
            
            let countdownFrom = time.toString();
            
            return browser
                .clearValue(elements.timerInput)
                .setValue(elements.timerInput, countdownFrom);
        },
        
        clickButton(browser, buttonName) {
            if (buttonName === 'GO!') {
                return browser.click(elements.goButton);
            } else if (buttonName === 'Options (beta)') {
                return browser
                    .click(elements.optionsBeta)
                    .waitForElementVisible(elements.optionsModal, 10000);
            }
        },
        
        getCurrentUrl(browser, callback) {
            return browser.url(currentUrl => callback(currentUrl.value));
        },
        
        countDownAndAssert(browser, time) {
            browser
                .waitForElementVisible(elements.progress, 45000)
                .getText(elements.progress, r => console.log(r))
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
    }
];

module.exports = {
    elements,
    commands,
};