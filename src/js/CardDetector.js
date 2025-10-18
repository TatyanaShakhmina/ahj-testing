// Определяет тип платежной системы по номеру карты (FreeFormatter)

export default class CardDetector {
    static patterns = {
        visa: /^4/,
        mastercard: /^(5[1-5]|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/,
        amex: /^3[47]/,
        discover: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5])|64[4-9]|65)/,
        jcb: /^35(2[89]|[3-8][0-9])/,
        diners: /^3(?:0[0-5]|[68][0-9])/,
        mir: /^22/
    };

    static detect(cardNumber) {
        // Убирает все не цифры
        const cleanNumber = cardNumber.replace(/\D/g, '');

        if (!cleanNumber) {
            return null;
        }

        // Ищет совпадения по платежным системам
        for (const [card, pattern] of Object.entries(this.patterns)) {
            if (pattern.test(cleanNumber)) {
                return card;
            }
        }

        return null;
    }
}