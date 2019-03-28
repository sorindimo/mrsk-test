const argv = require('yargs').argv;
const path = require('path');
const chromedriver = require('chromedriver');
const nightwatchCucumber = require('nightwatch-cucumber');

port_selenium = 9515;
host_selenium = 'localhost';
prefix_default_path = '';
globs = 'globals.js';

let workers = null;

if (argv.parallel === 'no') {
    workers = {
        enabled: false,
    }
} else {
    workers = {
        enabled: true,
        workers: argv.parallel,
    }
}

const features = argv.group ? argv.group.split(',') : null;

// maps the chosen features (groups) to step definition paths for requiring, or requires all
const stepDefinitionsDirs = (features
    ? features.map(dir => path.resolve(__dirname, `features/${dir}/step_definitions`))
    : glob.sync(path.resolve(__dirname, 'features/**/step_definitions'))
).reduce((requires, dir) => {
    requires.push('--require');
    requires.push(dir);
    return requires;
}, []);

// maps the chosen features (groups) to page_object paths for requiring, or requires all
const pageObjectsDirs = features
    ? features.map(dir => path.resolve(__dirname, `features/${dir}/page_objects`))
    : glob.sync(path.resolve(__dirname, 'features/**/page_objects'));

const common = path.resolve(__dirname, 'common');

let cucumberReport = 'json:testsReports/cucumber.json';

/* prettier-ignore */
nightwatchCucumber({
    nightwatchOutput: false,

    cucumberArgs: stepDefinitionsDirs.concat([
        '--require', 'hooks.js',
        '--format', cucumberReport,
        '--format', 'node_modules/cucumber-pretty',
        'features',
    ]),
});

const browserName = argv.browser || argv.b;

module.exports = {
    globals_path: `${globs}`,
    test_workers: workers,
    parallel_process_delay: 100,

    page_objects_path: pageObjectsDirs,

    disable_colors: false,

    selenium: {
        cli_args: {
            'webdriver.chrome.driver': chromedriver.path,
            'webdriver.chrome.logfile': 'chromedriver.log',
        },
        request_timeout_options: {
            timeout: 120000,
            retry_attempts: 5,
        },
    },

    test_settings: {
        end_session_on_fail: false,
        default: {
            selenium_port : port_selenium,
            selenium_host : host_selenium,
            default_path_prefix : prefix_default_path,

            launch_url: 'http://e.ggtimer.com/',
            request_timeout_options: {
                timeout: 120000,
                retry_attempts: 5,
            },
            silent: true,
            screenshots: {
                enabled: true,
                on_failure: true,
                on_error: true,
                path: 'testsScreenshots',
            },
            globals: {
                waitForConditionTimeout: 10000,
            },
            desiredCapabilities: {
                acceptSslCerts: true,
                browserName: browserName || 'chrome',
                javascriptEnabled: true,
                chromeOptions: {
                    args: [
                        '--no-default-browser-check',
                        '--no-first-run',
                        '--disable-boot-animation',
                        '--disable-default-apps',
                        '--disable-extensions',
                        '--disable-translate',
                        '--no-sandbox',
                        // '--disable-gpu',
                        '--verbose',
                        '--window-size=1400,900',
                    ],
                },
            },
        },

        production: {
            launch_url: 'http://e.ggtimer.com/',
        },
    },
};
