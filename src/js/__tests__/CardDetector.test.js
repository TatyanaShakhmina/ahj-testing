import CardDetector from '../CardDetector';

describe('CardDetector', () => {
    describe('detect', () => {
        describe('Visa', () => {
            test('должен определить Visa по номеру, начинающемуся с 4', () => {
                expect(CardDetector.detect('4532015112830366')).toBe('visa');
            });

            test('должен определить Visa с пробелами', () => {
                expect(CardDetector.detect('4532 0151 1283 0366')).toBe('visa');
            });

            test('должен определить Visa с дефисами', () => {
                expect(CardDetector.detect('4532-0151-1283-0366')).toBe('visa');
            });
        });

        describe('Mastercard', () => {
            test('должен определить Mastercard, начинающуюся с 51', () => {
                expect(CardDetector.detect('5105105105105100')).toBe('mastercard');
            });

            test('должен определить Mastercard, начинающуюся с 55', () => {
                expect(CardDetector.detect('5555555555554444')).toBe('mastercard');
            });

            test('должен определить Mastercard из нового диапазона 2221-2720', () => {
                expect(CardDetector.detect('2221000000000009')).toBe('mastercard');
            });

            test('должен определить Mastercard, начинающуюся с 2720', () => {
                expect(CardDetector.detect('2720999999999996')).toBe('mastercard');
            });
        });

        describe('American Express', () => {
            test('должен определить Amex, начинающуюся с 34', () => {
                expect(CardDetector.detect('340000000000009')).toBe('amex');
            });

            test('должен определить Amex, начинающуюся с 37', () => {
                expect(CardDetector.detect('370000000000002')).toBe('amex');
            });
        });

        describe('Discover', () => {
            test('должен определить Discover, начинающуюся с 6011', () => {
                expect(CardDetector.detect('6011111111111117')).toBe('discover');
            });

            test('должен определить Discover, начинающуюся с 644', () => {
                expect(CardDetector.detect('6441111111111111')).toBe('discover');
            });

            test('должен определить Discover, начинающуюся с 65', () => {
                expect(CardDetector.detect('6500000000000002')).toBe('discover');
            });
        });

        describe('JCB', () => {
            test('должен определить JCB, начинающуюся с 3528', () => {
                expect(CardDetector.detect('3528000000000007')).toBe('jcb');
            });

            test('должен определить JCB, начинающуюся с 3589', () => {
                expect(CardDetector.detect('3589000000000003')).toBe('jcb');
            });
        });

        describe('Diners Club', () => {
            test('должен определить Diners, начинающуюся с 30', () => {
                expect(CardDetector.detect('30000000000004')).toBe('diners');
            });

            test('должен определить Diners, начинающуюся с 36', () => {
                expect(CardDetector.detect('36000000000000')).toBe('diners');
            });

            test('должен определить Diners, начинающуюся с 38', () => {
                expect(CardDetector.detect('38000000000003')).toBe('diners');
            });
        });

        describe('МИР', () => {
            test('должен определить МИР, начинающуюся с 22', () => {
                expect(CardDetector.detect('2200000000000000')).toBe('mir');
            });
        });

        describe('Граничные случаи', () => {
            test('должен вернуть null для пустой строки', () => {
                expect(CardDetector.detect('')).toBe(null);
            });

            test('должен вернуть null для строки с пробелами', () => {
                expect(CardDetector.detect('   ')).toBe(null);
            });

            test('должен вернуть null для неизвестной платежной системы', () => {
                expect(CardDetector.detect('9999999999999999')).toBe(null);
            });

            test('должен вернуть null для строки с буквами', () => {
                expect(CardDetector.detect('abcd efgh ijkl')).toBe(null);
            });

            test('должен определить карту по первым цифрам независимо от длины', () => {
                expect(CardDetector.detect('4')).toBe('visa');
                expect(CardDetector.detect('51')).toBe('mastercard');
            });
        });
    });
});