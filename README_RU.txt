EDUFIX 2.0 — CINEMATIC EDITION
================================

РОВНО 5 HTML-СТРАНИЦ:
1. index.html       — cinematic landing + Three.js 3D scene
2. problems.html    — problem hub + AI solution analysis form
3. solutions.html   — ideas + voting
4. community.html   — community feed
5. dashboard.html   — local demo analytics

СТРУКТУРА:
css/style.css
js/app.js
server.js
package.json
.env.example

ЗАПУСК FRONTEND:
Нужен Node.js (LTS).
1. Откройте папку в VS Code.
2. Откройте Terminal в этой папке.
3. Выполните: npm install
4. Скопируйте .env.example в файл .env.
5. Для запуска сайта без AI выполните: npm start
6. Откройте http://localhost:3000

ПОДКЛЮЧЕНИЕ REAL AI:
1. API-ключ хранится ТОЛЬКО в серверном .env.
2. Никогда не вставляйте ключ в index.html, app.js, GitHub или публичный репозиторий.
3. Укажите OPENAI_API_KEY в .env и перезапустите npm start.
4. API может быть платным. До включения биллинга обсудите это с родителем/опекуном; не добавляйте платёжные данные самостоятельно.
5. Модель задаётся через OPENAI_MODEL. Значение по умолчанию: gpt-6-luna; если в вашем API-проекте модель недоступна, замените её на доступную в настройках API.

ВАЖНО:
- Tailwind, GSAP, Three.js и Google Fonts загружаются с CDN — нужен интернет.
- Пять HTML-страниц — frontend; server.js — backend, не HTML.
- Голосование, посты и предложения пока хранятся в LocalStorage одного браузера.
- Для общей школьной базы, авторизации и модерации нужен отдельный backend/database и правила доступа.
- AI — помощник для мозгового штурма, а не школьная администрация и не экстренная служба.
- Не публикуйте персональные данные учеников или сотрудников.
