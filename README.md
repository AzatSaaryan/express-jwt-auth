# **Authentication API with JWT**

## **Описание**
Этот проект демонстрирует реализацию аутентификации пользователей с использованием **Node.js**, **Express.js** и **JWT** (JSON Web Tokens).  
Основные функции включают:  
- Регистрацию
- Вход
- Выход
- Защиту маршрутов с помощью токенов  

---

## **Функциональность**
- **Регистрация пользователя**  
  Проверка корректности email, хэширование пароля с использованием `bcrypt`.  
- **Аутентификация**  
  Вход пользователя и выдача JWT токена.  
- **Защита маршрутов**  
  Проверка токена перед доступом к защищенным ресурсам.  
- **Выход пользователя**  
  Удаление токена из cookies.  

---

## **Используемые технологии**
- **Node.js** — серверная платформа.
- **Express.js** — фреймворк для создания серверных приложений.
- **MongoDB & Mongoose** — база данных и ORM для управления данными.
- **JWT (jsonwebtoken)** — управление токенами аутентификации.
- **bcrypt** — хэширование паролей.
- **EJS** — шаблонизатор для рендеринга страниц.

---
