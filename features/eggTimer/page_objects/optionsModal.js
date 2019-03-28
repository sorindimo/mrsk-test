const elements = {
    optionsModal: '#options',
    apply: '#options > a',
    beep: '#options > form > ul:nth-child(3) > li:nth-child(1) > input[type="radio"]',
    ring: '#options > form > ul:nth-child(3) > li:nth-child(2) > input[type="radio"]',
    full: '#options > form > ul:nth-child(5) > li:nth-child(1) > input[type="radio"]',
    half: '#options > form > ul:nth-child(5) > li:nth-child(2) > input[type="radio"]',
    none: '#options > form > ul:nth-child(5) > li:nth-child(3) > input[type="radio"]',
    on: '#options > form > ul:nth-child(7) > li:nth-child(1) > input[type="radio"]',
    off: '#options > form > ul:nth-child(7) > li:nth-child(2) > input[type="radio"]'
};

const commands = [
    {
        isModalVisible(browser, callback) {
            return browser.isVisible(elements.optionsModal, visible => callback(visible.value));
        },

        areOptionsChecked(browser, options, callback) {
            let checkedOptions = options.split(',');

            let areChecked = '';

            checkedOptions.forEach(option => {
                browser.expect.element(elements[option.toLowerCase()]).to.have.attribute('checked');
            })
        },

        checkOption(browser, option) {
            switch (option) {
                case 'Ring':
                    return browser.click(elements.ring);
                case 'Half':
                    return browser.click(elements.half);
                case 'Off':
                    return browser.click(elements.off);
                default:
                    return;
            }
        },

        apply(browser) {
            return browser
                .click(elements.apply)
                .waitForElementNotVisible(elements.apply, browser.globals.waitForConditionTimeout);
        }
    }
];

module.exports = {
    elements,
    commands,
};