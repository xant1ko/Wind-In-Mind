const tasks = [
    {
        title: "Завершить отчёт по продажам за Q1",
        description: "Собрать данные из CRM, Excel и сверить с бухгалтерией",
        priority: "firstPlan",
        isDone: false
    },
    {
        title: "Позвонить клиенту Иванову",
        description: "Обсудить условия нового договора",
        priority: "secondplan",
        isDone: true
    },
    {
        title: "Изучить TypeScript документацию",
        description: "Продвинутые типы, дженерики, утилиты",
        priority: "longDistance",
        isDone: false
    },
    {
        title: "Купить продукты",
        description: "Молоко, хлеб, яйца, сыр, помидоры",
        priority: "firstPlan",
        isDone: true
    },
    {
        title: "Настроить CI/CD pipeline",
        description: "GitHub Actions + Docker + AWS",
        priority: "firstPlan",
        isDone: false
    },
    {
        title: "Прочитать книгу 'Чистый код'",
        description: "Главы 1-5 до конца месяца",
        priority: "longDistance",
        isDone: false
    },
    {
        title: "Записаться к стоматологу",
        description: "Плановый осмотр, чистка зубов",
        priority: "secondplan",
        isDone: false
    },
    {
        title: "Оптимизировать MongoDB запросы",
        description: "Добавить индексы, проанализировать explain()",
        priority: "firstPlan",
        isDone: true
    },
    {
        title: "Сделать зарядку",
        description: "15 минут утренней растяжки",
        priority: "secondplan",
        isDone: true
    },
    {
        title: "Выучить 50 новых слов на английском",
        description: "Тема: Business English",
        priority: "longDistance",
        isDone: false
    },
    {
        title: "Провести code review",
        description: "Pull request #42 от команды backend",
        priority: "firstPlan",
        isDone: true
    },
    {
        title: "Заплатить за интернет",
        description: "Сумма: 650 руб. до 25 апреля",
        priority: "secondplan",
        isDone: false
    },
    {
        title: "Обновить зависимости в проекте",
        description: "Проверить на уязвимости через npm audit",
        priority: "secondplan",
        isDone: false
    },
    {
        title: "Написать пост в блог",
        description: "Тема: '5 советов junior разработчику'",
        priority: "longDistance",
        isDone: false
    },
    {
        title: "Созвониться с командой",
        description: "Daily sync в 11:00",
        priority: "firstPlan",
        isDone: true
    },
    {
        title: "Починить баг с авторизацией",
        description: "JWT токен не обновляется автоматически",
        priority: "firstPlan",
        isDone: false
    },
    {
        title: "Купить подарок на день рождения",
        description: "Маме: цветы и книга",
        priority: "secondplan",
        isDone: false
    },
    {
        title: "Пройти курс по Vue.js",
        description: "Модуль 3: Компоненты и пропсы",
        priority: "longDistance",
        isDone: false
    },
    {
        title: "Подготовить презентацию",
        description: "Для встречи с инвесторами (10 слайдов)",
        priority: "firstPlan",
        isDone: true
    },
    {
        title: "Убраться на рабочем столе",
        description: "Провести цифровой детокс в файлах",
        priority: "secondplan",
        isDone: false
    }
];

async function exportTasks() {
    const API_URL = 'http://localhost:8000/task/create';
    
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log(`✅ Задача ${i + 1}/${tasks.length}: "${task.title}" - UID: ${result._id || result.id || 'успешно создано'}`);
        } catch (error) {
            console.error(`❌ Ошибка при создании задачи "${task.title}":`, error.message);
        }
        
        // Небольшая задержка между запросами, чтобы не перегружать сервер
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    console.log(`\n🎉 Готово! Отправлено ${tasks.length} запросов на ${API_URL}`);
}

// Запуск функции
exportTasks();