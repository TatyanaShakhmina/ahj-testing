import CardValidator from '../CardValidator';

describe('CardValidator DOM interaction tests', () => {
    let container;

    beforeEach(() => {
        // Создаем контейнер для каждого теста
        container = document.createElement('div');
        container.id = 'app';
        document.body.appendChild(container);
    });

    afterEach(() => {
        // Очищаем DOM после каждого теста
        document.body.removeChild(container);
    });

    describe.each([
        ['4539148803436467', true, 'валидный номер Visa'],
        ['2200000000000004', true, 'валидный номер МИР'],
    ])('Валидация номеров карт', (cardNumber, isValid, description) => {
        test(`должна ${isValid ? 'принять' : 'отклонить'} ${description}`, () => {
            // Создаем валидатор
            const validator = new CardValidator(container);

            // Находим элементы
            const input = container.querySelector('.card-input');
            const button = container.querySelector('.validate-btn');

            // Вводим номер карты
            input.value = cardNumber;
            input.dispatchEvent(new Event('input', { bubbles: true }));

            // Кнопка
            button.click();

            // Проверяем результат
            if (isValid) {
                expect(input.classList.contains('valid')).toBe(true);
                expect(input.classList.contains('invalid')).toBe(false);
            } else {
                expect(input.classList.contains('valid')).toBe(false);
                expect(input.classList.contains('invalid')).toBe(true);
            }
        });
    });
});