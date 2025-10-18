import CardValidator from './CardValidator';
import '../css/style.css';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#app');
    new CardValidator(container);
});