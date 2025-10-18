
import puppeteer from 'puppeteer';

describe('Card Validator E2E Tests', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 80,
            devtools: true
        });
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        if (page) {
            await page.close();
        }
    });

    afterAll(async () => {
        if (browser) {
            await browser.close();
        }
    });

    test('should validate a valid card number', async () => {
        await page.goto('http://localhost:8080');

        await page.type('.card-input', '4539148803436467');

        // Кнопка
        await page.click('.validate-btn');

        // Модальное окно
        await page.waitForSelector('.modal-visible', { timeout: 3000 });

        const modalText = await page.$eval('.modal-text', el => el.textContent);
        expect(modalText).toContain('Номер карты валиден');
        expect(modalText).toContain('VISA');
    });

    test('should invalidate an invalid card number', async () => {
        await page.goto('http://localhost:8080');

        await page.type('.card-input', '1234567890123456');

        await page.click('.validate-btn');

        await page.waitForSelector('.modal-visible', { timeout: 3000 });

        const modalText = await page.$eval('.modal-text', el => el.textContent);
        expect(modalText).toContain('Номер карты невалиден');
    });
});