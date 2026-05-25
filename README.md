# ПОЛЯРИС - Детский центр развития

Landing page для детского центра развития ПОЛЯРИС в Ереване с автоматической отправкой заявок в Telegram.

## 📋 Структура проекта

```
polaris-project/
├── polaris_landing.html      # Frontend (HTML/CSS/JS)
├── api/
│   └── send-message.js       # Backend API для отправки сообщений в Telegram
├── package.json              # Node.js зависимости
├── vercel.json              # Конфигурация для Vercel
└── README.md                # Этот файл
```

## 🚀 Развертывание на Vercel

### Шаг 1: Подготовка репозитория
```bash
# Инициализируем Git (если еще не сделано)
cd /Users/idaabovyan/Downloads/polaris-project
git init
git add .
git commit -m "Initial commit: landing page with Telegram integration"
```

### Шаг 2: Развертывание на Vercel
```bash
# Установите Vercel CLI
npm install -g vercel

# Залогиньтесь в Vercel
vercel login

# Развертните проект
vercel
```

### Шаг 3: Установка переменных окружения

После развертывания проекта на Vercel:

1. Перейдите в [Vercel Dashboard](https://vercel.com/dashboard)
2. Выберите проект "polaris"
3. Перейдите в **Settings** → **Environment Variables**
4. Добавьте две переменные:

| Ключ | Значение |
|------|----------|
| `TELEGRAM_BOT_TOKEN` | `8807772200:AAEzszt4HRm_ptxNnqD5KzpC19RJdZ3OHVo` |
| `TELEGRAM_CHAT_ID` | `414279826` |

5. Нажмите **Save** для каждой переменной
6. Система автоматически перестартует развертывание (redeployment)

## 🔌 API Эндпоинт

### POST `/api/send-message`

Отправляет информацию о записи в Telegram ДМ администратору.

**Запрос:**
```json
{
  "childName": "Ева",
  "childAge": 6,
  "courseName": "Подготовка к школе",
  "contactType": "telegram",
  "parentPhone": null,
  "parentTelegram": "@example_username",
  "parentInstagram": null
}
```

**Ответ (успех):**
```json
{
  "success": true,
  "message": "✅ Запись успешно отправлена в Telegram!"
}
```

**Ответ (ошибка):**
```json
{
  "error": "Описание ошибки"
}
```

## 📱 Контакты

- **Telegram:** [@sensey1983](https://t.me/sensey1983)
- **Канал Telegram:** [t.me/polariserevan](https://t.me/polariserevan)
- **Instagram:** [@polaris.yerevan](https://instagram.com/polaris.yerevan)
- **Адрес:** Арабкир, ул. Сундукяна, 17 (недалеко от ТЦ РИО), Ереван

## ✅ Что реализовано

- ✅ Полностью адаптивный landing page
- ✅ Модальное окно для записи на занятия
- ✅ Валидация формы на frontend
- ✅ Автоматическая отправка заявок в Telegram
- ✅ Обработка ошибок на обеих сторонах (frontend и backend)
- ✅ Поддержка трех способов связи: телефон, Telegram, Instagram
- ✅ HTML форматирование сообщений в Telegram (эмодзи, жирный текст)
- ✅ CORS поддержка для кросс-доменных запросов

## 📝 Примеры использования

### 1. Пользователь заполняет форму на сайте
- Выбирает курс (Английский, Гимнастика, Театр и т.д.)
- Вводит имя и возраст ребенка
- Выбирает способ связи (телефон, Telegram, Instagram)
- Вводит свой контакт

### 2. Данные отправляются на сервер
- Frontend делает POST запрос на `/api/send-message`
- Backend валидирует все обязательные поля

### 3. Сообщение отправляется в Telegram
- Красиво оформленное сообщение с эмодзи
- Содержит всю информацию о записи
- Доставляется в личные сообщения администратора

## 🔒 Безопасность

- Окружающие переменные для чувствительных данных (токены, ID чата)
- Валидация данных на обеих сторонах
- CORS только для необходимых операций
- Правильная обработка ошибок без утечки информации

## 🛠️ Развитие

Возможные улучшения:
- Добавить повторные попытки отправки при сбоях сети
- Добавить логирование запросов
- Создать админ панель для просмотра записей
- Интеграция с Instagram Business API (автоматическая отправка ДМ)
- Сохранение записей в базу данных

---

**ПОЛЯРИС** © 2024 | Детский центр развития в Ереване
