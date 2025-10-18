// Проверяет валидность по Luhn algorithm

export default class LuhnAlgorithm {
    static validate(cardNumber) {
        // Убирает все не цифры
        const cleanNumber = cardNumber.replace(/\D/g, '');

        // Проверяет длину
        if (cleanNumber.length < 13 || cleanNumber.length > 19) {
            return false;
        }

        // Luhn algorithm
        const digits = cleanNumber.split('').map(Number).reverse();

        const sum = digits.reduce((acc, digit, i) => {
            if (i % 2 === 1) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            return acc + digit;
        }, 0);

        return sum % 10 === 0;
    }
}