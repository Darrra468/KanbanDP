# SF Kanban Board

Live: https://SanyBlagorodny.github.io/SF-Kanban-board/?v=20251106-1

## О проекте
Одностраничное приложение Канбан на React с локальной аутентификацией, мультиязычностью и перетаскиванием задач (desktop + mobile). Современный стеклянный UI и анимированный WebGL‑фон.

### Основные возможности
- 4 колонки: Задачи (Backlog) → Выполнить (Ready) → В работе (In Progress) → Завершенные (Finished)
- Добавление задач, редактирование названия/описания
- Перетаскивание задач мышью и на мобильных (tap‑drag)
- Мультиязычность RU/EN (экран выбора при старте, переключение сохраняется)
- Регистрация/вход (localStorage), состояние задач хранится ПО ПОЛЬЗОВАТЕЛЯМ (`state_<login>`) 
- Страница детали задачи с редактированием
- Визуальная статистика в футере (активные/завершенные)
- Стеклянная тема (glassmorphism) + фоновая анимация (DarkVeil на OGL)

## Технологии
- React 18 (Create React App), React Router v6 (HashRouter)
- CSS Modules
- OGL (WebGL) для фона
- GitHub Pages / GitHub Actions для деплоя

## Требования
- Node.js 16/18
- npm 8+

Проверка:
```bash
node -v
npm -v
```

## Установка
```bash
npm install
```
> В проект добавлена зависимость `ogl` для фоновой анимации.

## Запуск в разработке
```bash
npm start
```
Откроется http://localhost:3000. Маршрутизация через HashRouter (URL вида `#/tasks`).

## Сборка
```bash
npm run build
```
Сборка в папке `build/`.

## Деплой
Настроен деплой на GitHub Pages через GitHub Actions (рекомендуется) и скрипт `gh-pages`.
- CI: пуш в `main` публикует сайт: https://SanyBlagorodny.github.io/SF-Kanban-board/
- Локально: `npm run build` → `npm run deploy`

## Структура
```
src/
  components/
    board/         — колонки и рендер задач
    task/          — карточка задачи
    add/           — добавление/перенос задач (селект)
    insideTask/    — страница детали задачи
    header/, footer/
    login/, register/, lang/
    background/    — DarkVeil (WebGL‑фон)
  i18n/            — словари RU/EN
  App.js           — маршруты, контексты, глобальный фон
```

## Маршруты
- `#/` — профиль (после входа)
- `#/tasks` — доска
- `#/tasks/task/:id` — детальная задача
- Неизвестные пути перенаправляются на `#/`

## Хранение данных
- Пользователь: `localStorage.user`, флаг авторизации: `auth`
- Текущий пользователь: `currentUser`
- Доска: `state_<currentUser>` (персональные задачи)

## Drag & Drop
- Desktop: HTML5 DnD (dragover/drop) с позиционированием по указателю
- Mobile: жест tap‑drag — при отпускании задача перемещается в колонку/позицию под пальцем

## Известные нюансы
- Суперсэмплинг фона можно увеличить в `App.js` (`resolutionScale`) — это нагружает GPU
- Если после смены пользователя видите «старые» задачи — выйдите/войдите: состояние подхватится из `state_<login>`

## Устранение неполадок
- Порт занят — `set PORT=3001 && npm start` (PowerShell: `$env:PORT=3001; npm start`)
- Ошибки зависимостей — удалите `node_modules` и `package-lock.json`, затем `npm install`
- Проблемы сборки — `npm run build` и проверьте логи

---
Figma (референс): https://www.figma.com/file/yotdhAHetNQZy1tOi1UTPk/Kanban?node-id=0%3A1
- Проблемы с правами — запустите терминал от имени администратора.

Если ошибка сохраняется — запустите команду, скопируйте полный лог из консоли и приложите его к обращению.

## Полезные ссылки
- CRA Docs: https://facebook.github.io/create-react-app/docs/getting-started
- React Docs: https://react.dev/
