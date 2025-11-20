<template>
  <div class="policy-page">
    <div class="container">
      <!-- Заголовок -->
      <header class="page-header">
        <h1>Политика конфиденциальности</h1>
        <p class="last-updated">Последнее обновление: {{ currentDate }}</p>
      </header>

      <!-- Основное содержание -->
      <main class="content">
        <section class="section">
          <h2>1. Общие положения</h2>
          <p>Настоящая Политика конфиденциальности регулирует порядок сбора, хранения, использования и раскрытия персональных данных Пользователей.</p>
          <p>Используя данный сайт, Вы соглашаетесь с условиями настоящей Политики конфиденциальности.</p>
        </section>

        <section class="section">
          <h2>2. Собираемая информация</h2>
          <h3>2.1. Персональные данные:</h3>
          <ul>
            <li>Имя и контактная информация</li>
            <li>Электронная почта</li>
            <li>Номер телефона</li>
            <li>Демографические данные</li>
          </ul>

          <h3>2.2. Техническая информация:</h3>
          <ul>
            <li>IP-адрес и данные о местоположении</li>
            <li>Тип браузера и операционной системы</li>
            <li>Время и дата посещения</li>
            <li>Страницы, которые Вы просматриваете</li>
          </ul>
        </section>

        <section class="section">
          <h2>3. Цели сбора информации</h2>
          <p>Мы используем собранную информацию для:</p>
          <ul>
            <li>Предоставления и улучшения наших услуг</li>
            <li>Обратной связи с Пользователями</li>
            <li>Анализа использования сайта</li>
            <li>Персонализации контента</li>
            <li>Отправки уведомлений и обновлений</li>
          </ul>
        </section>

        <section class="section">
          <h2>4. Защита данных</h2>
          <p>Мы принимаем необходимые организационные и технические меры для защиты Ваших персональных данных от:</p>
          <ul>
            <li>Неавторизованного доступа</li>
            <li>Изменения</li>
            <li>Раскрытия</li>
            <li>Уничтожения</li>
          </ul>
        </section>

        <section class="section">
          <h2>5. Передача данных третьим лицам</h2>
          <p>Мы не передаем Ваши персональные данные третьим лицам, за исключением:</p>
          <ul>
            <li>С Вашего явного согласия</li>
            <li>По требованию законодательства</li>
            <li>Для защиты наших законных прав</li>
            <li>Партнерам, оказывающим услуги от нашего имени</li>
          </ul>
        </section>

        <section class="section">
          <h2>6. Файлы cookies</h2>
          <p>Мы используем файлы cookies для:</p>
          <ul>
            <li>Запоминания Ваших предпочтений</li>
            <li>Анализа трафика сайта</li>
            <li>Улучшения пользовательского опыта</li>
          </ul>
          <p>Вы можете отключить cookies в настройках браузера.</p>
        </section>

        <section class="section">
          <h2>7. Права Пользователей</h2>
          <p>Вы имеете право:</p>
          <ul>
            <li>На доступ к своим персональным данным</li>
            <li>На исправление неточных данных</li>
            <li>На удаление персональных данных</li>
            <li>На отзыв согласия на обработку</li>
            <li>На перенос данных</li>
          </ul>
        </section>

        <section class="section">
          <h2>8. Изменения в Политике</h2>
          <p>Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности.</p>
          <p>Об изменениях мы уведомим путем размещения новой версии Политики на сайте.</p>
        </section>

        <section class="section">
          <h2>9. Контактная информация</h2>
          <p>По вопросам, связанным с обработкой персональных данных, обращайтесь:</p>
          <ul>
            <li>Email: privacy@company.com</li>
            <li>Телефон: +7 (XXX) XXX-XX-XX</li>
            <li>Адрес: г. Петропавловск, ул. Пушкина</li>
          </ul>
        </section>
      </main>

      <!-- Футер -->
      <footer class="page-footer">
        <p>© {{ currentYear }} Все права защищены.</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PolicyPage',
  data() {
    return {
      currentDate: new Date().toLocaleDateString('ru-RU'),
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.policy-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.back-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background: #5a6268;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 20px;
}

.page-header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2.5rem;
}

.last-updated {
  color: #6c757d;
  font-style: italic;
}

.content {
  line-height: 1.6;
}

.section {
  margin-bottom: 30px;
}

.section h2 {
  color: #2c3e50;
  border-left: 4px solid #e74c3c;
  padding-left: 15px;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.section h3 {
  color: #34495e;
  margin: 15px 0 10px 0;
  font-size: 1.2rem;
}

.section p {
  margin-bottom: 10px;
  color: #555;
}

.section ul {
  margin: 10px 0;
  padding-left: 20px;
}

.section li {
  margin-bottom: 5px;
  color: #555;
}

.page-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
  text-align: center;
  color: #6c757d;
}

/* Адаптивность */
@media (max-width: 768px) {
  .container {
    margin: 10px;
    padding: 20px;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .section h2 {
    font-size: 1.3rem;
  }
}
</style>