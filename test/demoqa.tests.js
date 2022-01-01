'use strict'

const {Builder, By, until, Key} = require('selenium-webdriver');
const chai = require('chai');
const expect= chai.expect;
const chrome = require('selenium-webdriver/chrome');

describe('DemoQA tests', function() {
    let driver;

    before(async function() {
        let service = new chrome.ServiceBuilder('C:\\Users\\User\\QAKurs\\Chrome Driver\\chromedriver.exe').build()
        chrome.setDefaultService(service);

        driver = await new Builder().forBrowser('chrome').build();
    });

    after(function() {
        return driver.quit();
    });

    it('Opens demoqa.com homepage', async function() {
        await driver.get('https://demoqa.com/')

        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/');

    });

    it('Open Elements page', async function() {
        const elementsPage=await driver.findElement(
            By.xpath('//h5[contains(.,"Elements")]/parent::div[contains(@class, "card")]')
            );
        await elementsPage.click();
        
        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/elements');
    });

    it('Opens Text Box page,fills the form and submits', async function() {
        const textBox = await driver.findElement(By.id('item-o'));
        await textBox.click();

        expect(await driver.findElement(By.className('main-header')).getText()).to.eq('Text Box');

        const fillUserName= 'John Doe';
        const fillUserEmail= 'john.doe@john.doe';
        const fillCurrentAddress= 'Funny rd. 34';
        const fillPermanentAddress= 'Funny rd. 34';

        const fullName= await driver.findElement()

    });

})