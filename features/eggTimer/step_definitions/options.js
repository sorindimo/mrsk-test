const { client } = require('nightwatch-cucumber');
const { Given, Then, When } = require('cucumber');

const optionsModal = client.page.optionsModal();

When('I {string} the options modal', (visibility) => {
    if (visibility === 'see') {
        optionsModal.isModalVisible(client, visible => client.assert.equal(visible, true));
    } else {
        optionsModal.isModalVisible(client, visible => client.assert.equal(visible, false));
    }
});

Then('the options checked: {string}', (options) => {
    optionsModal.areOptionsChecked(client, options, checked => client.assert.equal(checked, true));
});


When('I check {string}', (option) => {
    optionsModal.checkOption(client, option);
});

When('I Apply', () => {
    optionsModal.apply(client);
});