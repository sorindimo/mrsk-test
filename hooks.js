const { Given, After, AfterAll } = require('cucumber');
const { client } = require('nightwatch-cucumber');

Given('I go to the e.ggtimer homepage', () => {
        client.url(client.launch_url)
        client.waitForElementPresent('#start_a_timer', 45000);
    }
);

After((test) => {
    return client.execute('localStorage.clear();sessionStorage.clear();').deleteCookies().refresh();
});

AfterAll(() => {
    return client.end();
});