// Получение элементов
const preloader = document.getElementById("preloader");
const content = document.getElementById("content");
const orderButton = document.getElementById("placeOrderButton");
const headerOrderButton = document.getElementById("orderButton");
const priceInput = document.getElementById("price");
const totalOutput = document.getElementById("total");
const qrTextInput = document.getElementById("qr-text");
const qrButton = document.getElementById("create-qr-btn");
const qrImg = document.getElementById("qr-img");
const categoryButton = document.getElementById("category-btn");
const darkModeButton = document.getElementById("dark-mode-btn");
const voiceButton = document.getElementById("voice-btn");
const currencyInput = document.getElementById("currency");
const convertedOutput = document.getElementById("converted");
const timeDisplay = document.getElementById("time");

// Прелоадер
setTimeout(() => {
    if (preloader && content) {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
            content.style.display = "block";
            setTimeout(() => content.style.opacity = "1", 100);
        }, 1000);
    }
}, 5000);

// Функция обработки заказа
function handleOrder() {
    if (confirm("Вы уверены, что хотите сделать заказ?")) {
        window.open("https://www.maisonmargiela.com/wx/help?content=help-contact-us", "_blank");
        alert("Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время.");
    }
}

// Назначение обработчиков на кнопки заказа
orderButton?.addEventListener("click", handleOrder);
headerOrderButton?.addEventListener("click", handleOrder);

// Темный режим
darkModeButton?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Озвучивание текста
voiceButton?.addEventListener("click", () => {
    const text = document.body.innerText;
    if (text.trim()) {
        const speech = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(speech);
    }
});

// Конвертер валют
async function convertCurrency() {
    const amount = parseFloat(currencyInput?.value);
    if (!amount || amount <= 0) {
        alert("Введите корректную сумму!");
        return;
    }
    try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        if (!response.ok) throw new Error("Ошибка получения данных о курсе валют");
        const data = await response.json();
        convertedOutput.innerText = (amount * data.rates.UZS).toFixed(2) + " сум";
    } catch (error) {
        alert("Ошибка загрузки данных о курсе валют. Попробуйте позже.");
    }
}

// Обновление времени
function updateTime() {
    if (timeDisplay) {
        const now = new Date();
        timeDisplay.innerText = now.toLocaleTimeString();
    }
}
setInterval(updateTime, 1000);
updateTime();

// Анимация при прокрутке
function revealOnScroll() {
    document.querySelectorAll(".anim-block, .anim-line").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) {
            el.classList.add("visible");
        }
    });
}
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".anim-block, .anim-line").forEach(el => observer.observe(el));

// Показ карточек при прокрутке
function revealCards() {
    document.querySelectorAll(".section_card").forEach(card => {
        if (card.getBoundingClientRect().top < window.innerHeight - 50) {
            card.classList.add("show");
        }
    });
}
window.addEventListener("scroll", revealCards);
revealCards();
