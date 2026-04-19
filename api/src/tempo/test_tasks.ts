

export type Task = {
    uid:string
    title?: string,
    description?: string,
    dateCompleted?: string,
    priority: "firstPlan" |"secondplan"|"longDistance"
    createdDate?: string
}

export let tasks = <Task[]>([
    // FIRST PLAN - Высокий приоритет (срочные и важные задачи)
    // {
    //     title: "Завершить модуль авторизации",
    //     description: "Добавить JWT токены, реализовать refresh token и защиту роутов",
    //     dateCompleted: "2026-03-28",
    //     priority: "firstPlan"
    // },
    // {
    //     title: "Создать дашборд аналитики",
    //     description: "Сверстать главную страницу с графиками, добавить фильтры по датам",
    //     dateCompleted: "2026-03-30",
    //     priority: "firstPlan"
    // },
    // {
    //     title: "Настроить CI/CD pipeline",
    //     description: "Написать конфиги для GitHub Actions, настроить автоматический деплой на сервер",
    //     dateCompleted: "2026-03-26",
    //     priority: "firstPlan"
    // },
    // {
    //     title: "Оптимизировать запросы к БД",
    //     description: "Добавить индексы, оптимизировать N+1 проблемы, настроить кэширование",
    //     dateCompleted: "2026-03-29",
    //     priority: "firstPlan"
    // },
    // {
    //     title: "Написать unit-тесты для core-модулей",
    //     description: "Покрыть тестами основные бизнес-логики, достичь 80% покрытия",
    //     dateCompleted: "2026-03-31",
    //     priority: "firstPlan"
    // },
    // {
    //     title: "Исправить критические баги в продакшене",
    //     description: "Починить ошибку с сохранением данных и проблему с рендерингом на мобильных устройствах",
    //     dateCompleted: "2026-03-25",
    //     priority: "firstPlan"
    // },
    // {
    //     title: "Провести код-ревью pull requests",
    //     description: "Проверить 15 ожидающих PR, оставить комментарии и запросить правки",
    //     dateCompleted: "2026-03-27",
    //     priority: "firstPlan"
    // },
    // {
    //     title: "Настроить мониторинг и алерты",
    //     description: "Подключить Sentry, настроить уведомления в Telegram об ошибках",
    //     dateCompleted: "2026-03-28",
    //     priority: "firstPlan"
    // },
    // {
    //     title: "Обновить зависимости безопасности",
    //     description: "Обновить npm пакеты с критическими уязвимостями, проверить совместимость",
    //     dateCompleted: "2026-03-26",
    //     priority: "firstPlan"
    // },
    // {
    //     title: "Создать документацию API",
    //     description: "Описать все эндпоинты в Swagger, добавить примеры запросов и ответов",
    //     dateCompleted: "2026-03-30",
    //     priority: "firstPlan"
    // },

    // // SECOND PLAN - Средний приоритет (важно, но не срочно)
    // {
    //     title: "Рефакторинг легаси кода",
    //     description: "Переписать устаревшие компоненты на Composition API, улучшить читаемость",
    //     dateCompleted: "2026-04-05",
    //     priority: "secondplan"
    // },
    // {
    //     title: "Добавить темную тему",
    //     description: "Реализовать переключение темы, сохранять выбор пользователя в localStorage",
    //     dateCompleted: "2026-04-07",
    //     priority: "secondplan"
    // },
    // {
    //     title: "Написать E2E тесты",
    //     description: "Добавить тесты на Cypress для критических пользовательских сценариев",
    //     dateCompleted: "2026-04-10",
    //     priority: "secondplan"
    // },
    // {
    //     title: "Улучшить SEO оптимизацию",
    //     description: "Добавить метатеги, sitemap, robots.txt, оптимизировать заголовки",
    //     dateCompleted: "2026-04-08",
    //     priority: "secondplan"
    // },
    // {
    //     title: "Интеграция с платежной системой",
    //     description: "Подключить Stripe API, настроить вебхуки для обработки платежей",
    //     dateCompleted: "2026-04-12",
    //     priority: "secondplan"
    // },
    // {
    //     title: "Создать админ-панель",
    //     description: "Разработать интерфейс для управления пользователями и контентом",
    //     dateCompleted: "2026-04-15",
    //     priority: "secondplan"
    // },
    // {
    //     title: "Оптимизировать бандл",
    //     description: "Настроить code splitting, ленивую загрузку модулей, уменьшить размер сборки",
    //     dateCompleted: "2026-04-06",
    //     priority: "secondplan"
    // },
    // {
    //     title: "Добавить анимации и переходы",
    //     description: "Реализовать плавные переходы между страницами, анимацию появления элементов",
    //     dateCompleted: "2026-04-09",
    //     priority: "secondplan"
    // },
    // {
    //     title: "Написать сниппеты для VSCode",
    //     description: "Создать кастомные сниппеты для ускорения разработки компонентов",
    //     dateCompleted: "2026-04-11",
    //     priority: "secondplan"
    // },
    // {
    //     title: "Провести нагрузочное тестирование",
    //     description: "Протестировать API под нагрузкой, выявить узкие места и оптимизировать",
    //     dateCompleted: "2026-04-14",
    //     priority: "secondplan"
    // },

    // // LONG DISTANCE - Долгосрочные задачи (низкий приоритет)
    // {
    //     title: "Изучить TypeScript вглубь",
    //     description: "Пройти продвинутый курс по TypeScript, изучить utility types и generics",
    //     dateCompleted: "2026-05-20",
    //     priority: "longDistance"
    // },
    // {
    //     title: "Миграция на новую версию фреймворка",
    //     description: "Обновиться с Vue 3.3 до 3.5, исправить breaking changes",
    //     dateCompleted: "2026-05-25",
    //     priority: "longDistance"
    // },
    // {
    //     title: "Создать библиотеку UI компонентов",
    //     description: "Вынести переиспользуемые компоненты в отдельный npm пакет",
    //     dateCompleted: "2026-06-01",
    //     priority: "longDistance"
    // },
    // {
    //     title: "Внедрить WebSocket соединение",
    //     description: "Реализовать real-time обновления данных через Socket.io",
    //     dateCompleted: "2026-05-28",
    //     priority: "longDistance"
    // },
    // {
    //     title: "Написать техническую статью",
    //     description: "Опубликовать статью на Habr или Medium об оптимизации производительности",
    //     dateCompleted: "2026-06-10",
    //     priority: "longDistance"
    // },
    // {
    //     title: "Сделать мобильное приложение",
    //     description: "Завернуть веб-приложение в Capacitor, подготовить к публикации в stores",
    //     dateCompleted: "2026-06-20",
    //     priority: "longDistance"
    // },
    // {
    //     title: "Внедрить аналитику",
    //     description: "Подключить Google Analytics, настроить отслеживание событий и воронок",
    //     dateCompleted: "2026-05-30",
    //     priority: "longDistance"
    // },
    // {
    //     title: "Оптимизировать доступность (a11y)",
    //     description: "Добавить ARIA-метки, улучшить навигацию с клавиатуры, проверить контрастность",
    //     dateCompleted: "2026-06-05",
    //     priority: "longDistance"
    // },
    // {
    //     title: "Создать систему кэширования",
    //     description: "Реализовать стратегии кэширования данных на клиенте с использованием IndexedDB",
    //     dateCompleted: "2026-06-15",
    //     priority: "longDistance"
    // },
    // {
    //     title: "Автоматизировать создание отчетов",
    //     description: "Настроить генерацию PDF отчетов и отправку по email",
    //     dateCompleted: "2026-06-18",
    //     priority: "longDistance"
    // }
])