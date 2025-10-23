/** @jest-environment node */
import puppeteer from 'puppeteer';

describe('Card Validator E2E Tests', () => {
    let browser;
    let page;

    beforeAll(async () => {
        const isCI = !!process.env.CI;
        browser = await puppeteer.launch({
            // включаем headless-режим для CI
            headless: true,
            // в CI нужны эти аргументы, иначе ошибка sandbox
            args: isCI ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
            // локально можно оставить замедление, если хотите
            ...(isCI ? {} : { slowMo: 80 })
        });
    }, 30000);

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
        await page.goto('http://localhost:8080', {
            waitUntil: 'networkidle0',
            timeout: 10000
        });

        await page.waitForSelector('.card-input', { timeout: 5000 });

        await page.type('.card-input', '4539148803436467');

        // Кнопка
        await page.click('.validate-btn');

        // Модальное окно
        await page.waitForSelector('.modal-visible', { timeout: 5000 });

        const modalText = await page.$eval('.modal-text', el => el.textContent);
        expect(modalText).toContain('Номер карты валиден');
        expect(modalText).toContain('VISA');
    }, 30000);

    test('should invalidate an invalid card number', async () => {
        await page.goto('http://localhost:8080', {
            waitUntil: 'networkidle0',
            timeout: 10000
        });

        await page.waitForSelector('.card-input', { timeout: 5000 });

        await page.type('.card-input', '1234567890123456');

        await page.click('.validate-btn');

        await page.waitForSelector('.modal-visible', { timeout: 5000 });

        const modalText = await page.$eval('.modal-text', el => el.textContent);
        expect(modalText).toContain('Номер карты невалиден');
    }, 30000);
});