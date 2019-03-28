const { client } = require('nightwatch-cucumber');
const { Given, Then, When } = require('cucumber');

const eggTimer = client.page.eggTimer();

When('I enter {string} in the timer input field', (time) => {
    eggTimer.enterTime(client, time);
});

When('I click {string}', (buttonName) => {
    return eggTimer.clickButton(client, buttonName);
});

Then('I see the page URL containing {string}', (time) => {
    let expectedUrl = '';
    
    if (time.includes(' ')) {
        expectedUrl = `https://e.ggtimer.com/${time.replace(' ', '%20')}`;
    } else {
        expectedUrl = `https://e.ggtimer.com/${time}`;
    }
    
    return eggTimer.getCurrentUrl(client, actualUrl => client.assert.equal(actualUrl, expectedUrl));
});

Then('the timer counts down one second at a time from {string}', (time) => {
    eggTimer.countDownAndAssert(client, time);
});