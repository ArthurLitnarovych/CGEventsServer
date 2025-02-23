Для налаштування проєкту необхідно створити файл .env і вказати такі параметри:
DB_HOST=localhost  
DB_PORT=5432  
DB_USER=postgres  
DB_PASSWORD=password  
DB_NAME=cgevents
FRONTEND_URL=http://localhost:3000
BACKEND_PORT=3001

Далі слід встановити залежності за допомогою команди yarn i, а для запуску сервера у режимі розробки використовувати yarn start:dev.
