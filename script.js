// Тестовые данные (упрощенный вариант)
const testData = {
    questions: [
        {
            text: "Что вам больше нравится?",
            options: [
                "Ухаживать за животными",
                "Ремонтировать технику"
            ],
            categories: ["nature", "tech"]
        },
        {
            text: "Что бы вы предпочли?",
            options: [
                "Заниматься лечением людей",
                "Составлять таблицы, схемы"
            ],
            categories: ["person", "sign"]
        },
        {
            text: "Что вам интереснее?",
            options: [
                "Следить за качеством книжных иллюстраций",
                "Следить за состоянием приборов"
            ],
            categories: ["art", "tech"]
        },
        {
            text: "Что бы вы с удовольствием делали?",
            options: [
                "Оформлять выставки",
                "Работать на клавиатуре"
            ],
            categories: ["art", "sign"]
        },
        {
            text: "Что вам больше по душе?",
            options: [
                "Разрабатывать новые виды изделий",
                "Разрабатывать новые виды лекарств"
            ],
            categories: ["tech", "nature"]
        }
    ],
    categories: {
        "nature": "Человек-природа",
        "tech": "Человек-техника",
        "person": "Человек-человек",
        "sign": "Человек-знаковая система",
        "art": "Человек-художественный образ"
    }
};

let currentQuestion = 0;
let answers = [];
let scores = {
    "nature": 0,
    "tech": 0,
    "person": 0,
    "sign": 0,
    "art": 0
};

// Инициализация теста
document.addEventListener('DOMContentLoaded', function() {
    renderQuestion();
    document.getElementById('submit-btn').addEventListener('click', showResults);
});

function renderQuestion() {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    const question = testData.questions[currentQuestion];
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    
    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.textContent = question.text;
    questionElement.appendChild(questionText);
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        
        if (answers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.addEventListener('click', function() {
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            answers[currentQuestion] = parseInt(this.dataset.index);
            updateNavigation();
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    questionElement.appendChild(optionsContainer);
    container.appendChild(questionElement);
    updateProgress();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / testData.questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = 
        `Вопрос ${currentQuestion + 1} из ${testData.questions.length}`;
}

function updateNavigation() {
    const submitBtn = document.getElementById('submit-btn');
    const hasAnswered = answers[currentQuestion] !== undefined;
    
    if (currentQuestion === testData.questions.length - 1) {
        submitBtn.textContent = 'Получить результаты';
        submitBtn.disabled = !hasAnswered;
    }
}

function showResults() {
    calculateResults();
    
    const resultsContainer = document.getElementById('results-content');
    resultsContainer.innerHTML = '';
    
    Object.keys(scores).forEach(categoryKey => {
        if (scores[categoryKey] > 0) {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'result-category';
            
            const title = document.createElement('h3');
            title.textContent = `${testData.categories[categoryKey]} - ${scores[categoryKey]} баллов`;
            categoryElement.appendChild(title);
            
            resultsContainer.appendChild(categoryElement);
        }
    });
    
    document.getElementById('results').style.display = 'block';
    document.querySelector('.test-container').style.display = 'none';
}

function calculateResults() {
    Object.keys(scores).forEach(key => {
        scores[key] = 0;
    });
    
    answers.forEach((answerIndex, questionIndex) => {
        const question = testData.questions[questionIndex];
        const category = question.categories[answerIndex];
        scores[category]++;
    });
}