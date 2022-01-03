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
        const textBoxBttn = await driver.findElement(By.id('item-0'));
        await textBoxBttn.click();

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
        const checkBoxBttn=await driver.findElement
        (By.xpath('//span[@class="text" and contains(., "Check Box")]'));
        checkBoxBttn.click();

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

    it('Opens Radio Button and checks Impressive', async function() {
        const radioBttn= await driver.findElement
        (By.xpath('//span[@class="text" and contains(.,"Radio Button")]'));
        await radioBttn.click();

        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/radio-button');

        const impressiveBttn= await driver.findElement(By.id('impressiveRadio'));
        await impressiveBttn.click();

        expect(await driver.findElement(By.css('p')).getText()).to.contain('You have selected');
    });

    it('Tests dynamic properties', async function() {
        const dynProperties= await driver.findElement(By.id('item-8'));
        await dynProperties.click();

        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/dynamic-properties');

        const buttonEnabledAfter= await driver.findElement(By.id('enableAfter'));
        await driver.wait(until.elementIsEnabled(buttonEnabledAfter));

        expect(await buttonEnabledAfter.isEnabled()).to.eq(true);

        const buttonVisibleAfter= await driver.findElement(By.id('visibleAfter'));
        await driver.wait(until.elementIsVisible(buttonVisibleAfter));
        
        expect(await buttonVisibleAfter.isDisplayed()).to.eq(true);

    });

    it('Tests Web Tables', async function() {
        const webTableBttn= await driver.findElement
        (By.xpath('//span[@class="text" and contains(.,"Web Tables")]'));
        await webTableBttn.click();

        expect(await driver.findElement(By.className('main-header')).getText()).to.eq('Web Tables');

        const addBttn= await driver.findElement(By.id('addNewRecordButton'));
        await addBttn.click();

        expect(await driver.findElement(By.id('registration-form-modal')));

        const firstName='Maja';
        const lastName='Ninkovic';
        const email='email.address@email.com';
        const age='25';
        const salary='120000';
        const department='Education';

        const fillFirstName= await driver.findElement(By.id('firstName'));
        fillFirstName.sendKeys(firstName);

        const fillLastName= await driver.findElement(By.id('lastName'));
        fillLastName.sendKeys(lastName);

        const fillEmail= await driver.findElement(By.id('userEmail'));
        fillEmail.sendKeys(email);

        const fillAge= await driver.findElement(By.id('age'));
        fillAge.sendKeys(age);

        const fillSalary=await driver.findElement(By.id('salary'));
        fillSalary.sendKeys(salary);

        const fillDpt=await driver.findElement(By.id('department'));
        fillDpt.sendKeys(department);

        const submitButton= await driver.findElement(By.id('submit'));
        submitButton.click();

        expect(await driver.findElement(By.xpath('//div[@role="gridcell"][5]')).getText()).to.eq(salary);
        
        
    })

})