'use strict'

const {Builder, By, until, Key} = require('selenium-webdriver');
const chai = require('chai');
const expect= chai.expect;
const chrome = require('selenium-webdriver/chrome');

describe('DemoQA tests', function() {
    let driver;

    before(async function() {
        let service = new chrome.ServiceBuilder('C:\\Users\\Korisnik\\Kurs\\Chrome Driver\\chromedriver.exe').build()
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
        const textBox = await driver.findElement(By.id('item-0'));
        await textBox.click();

        expect(await driver.findElement(By.className('main-header')).getText()).to.eq('Text Box');

        const fillUserName= 'John Doe';
        const fillUserEmail= 'john.doe@john.doe';
        const fillCurrentAddress= 'Funny rd. 34';
        const fillPermanentAddress= 'Funny rd. 34';

        const fullName= await driver.findElement(By.id('userName'));
        fullName.sendKeys(fillUserName);

        const email = await driver.findElement(By.id('userEmail'));
        email.sendKeys(fillUserEmail);

        const currAddress = await driver.findElement(By.id('currentAddress'));
        currAddress.sendKeys(fillCurrentAddress);

        const perAddress = await driver.findElement(By.id('permanentAddress'));
        perAddress.sendKeys(fillPermanentAddress);

        const submitBttn= await driver.findElement(By.id('submit'));
        submitBttn.click();

        expect(await driver.findElement(By.id('output')));

    });

    it('Open Check Box and check a field Documents', async function() {
        const checkBox=await driver.findElement
        (By.xpath('//span[@class="text" and contains(., "Check Box")]'));
        checkBox.click();

        expect(await driver.findElement(By.className('main-header')).getText()).to.eq('Check Box');

        const expandAll= await driver.findElement
        (By.className('rct-icon rct-icon-expand-all'));

        await expandAll.click();

        expect(await driver.findElement
            (By.xpath('//span[@class="rct-title" and contains(.,"Documents")]')));

        const checkField= await driver.findElement(By.className('rct-checkbox'));
            await checkField.click();
            
            expect(await driver.findElement(By.id('result')).getText()).to.contain('You have selected');
    });

})