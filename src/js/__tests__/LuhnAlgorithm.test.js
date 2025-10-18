import LuhnAlgorithm from '../LuhnAlgorithm';

describe('LuhnAlgorithm', () => {
    describe('validate', () => {
        test('должен вернуть true для Visa', () => {
            expect(LuhnAlgorithm.validate('4532015112830366')).toBe(true);
        });

        test('должен вернуть true для Mastercard', () => {
            expect(LuhnAlgorithm.validate('5425233430109903')).toBe(true);
        });

        test('должен вернуть true для American Express', () => {
            expect(LuhnAlgorithm.validate('374245455400126')).toBe(true);
        });

        test('должен корректно обрабатывать номер с пробелами', () => {
            expect(LuhnAlgorithm.validate('4532 0151 1283 0366')).toBe(true);
        });

        test('должен корректно обрабатывать номер с дефисами', () => {
            expect(LuhnAlgorithm.validate('4532-0151-1283-0366')).toBe(true);
        });

        test('должен вернуть false для номера короче 13 цифр', () => {
            expect(LuhnAlgorithm.validate('123456789012')).toBe(false);
        });

        test('должен вернуть false для номера длиннее 19 цифр', () => {
            expect(LuhnAlgorithm.validate('12345678901234567890')).toBe(false);
        });

        test('должен вернуть false для пустой строки', () => {
            expect(LuhnAlgorithm.validate('')).toBe(false);
        });

        test('должен вернуть false для строки только с пробелами', () => {
            expect(LuhnAlgorithm.validate('    ')).toBe(false);
        });

        test('должен вернуть false для строки без цифр', () => {
            expect(LuhnAlgorithm.validate('abcd-efgh-ijkl')).toBe(false);
        });

        test('должен вернуть true для минимальной длины валидного номера (13 цифр)', () => {
            expect(LuhnAlgorithm.validate('4532015112830')).toBe(true);
        });
    });
});