<template>
  <div class="conditions-page">
    <div class="container">
      <!-- Заголовок -->
      <header class="page-header">
        <h1>Условия использования</h1>
        <p class="last-updated">Последнее обновление: {{ currentDate }}</p>
      </header>

      <!-- Основное содержание -->
      <main class="content">
        <section class="section">
          <h2>1. Общие положения</h2>
          <p>Настоящие Условия использования регулируют отношения между Пользователем и Администрацией сайта.</p>
          <p>Используя данный сайт, Вы соглашаетесь с настоящими Условиями.</p>
        </section>

        <section class="section">
          <h2>2. Права и обязанности сторон</h2>
          <h3>2.1. Пользователь обязуется:</h3>
          <ul>
            <li>Не нарушать законодательство Республики Казахстан</li>
            <li>Не размещать незаконный контент</li>
            <li>Не совершать действия, которые могут нарушить работу сайта</li>
            <li>Не использовать сайт для распространения спама</li>
          </ul>

          <h3>2.2. Администрация обязуется:</h3>
          <ul>
            <li>Обеспечивать работоспособность сайта</li>
            <li>Защищать персональные данные пользователей</li>
            <li>Рассматривать обращения пользователей</li>
          </ul>
        </section>

        <section class="section">
          <h2>3. Интеллектуальная собственность</h2>
          <p>Все материалы, размещенные на сайте, являются интеллектуальной собственностью Администрации, если не указано иное.</p>
        </section>

        <section class="section">
          <h2>4. Ограничение ответственности</h2>
          <p>Администрация не несет ответственности за:</p>
          <ul>
            <li>Действия пользователей</li>
            <li>Содержание внешних сайтов</li>
            <li>Временные технические сбои в работе сайта</li>
          </ul>
        </section>

        <section class="section">
          <h2>5. Изменение условий</h2>
          <p>Администрация оставляет за собой право изменять настоящие Условия в любое время.</p>
          <p>Изменения вступают в силу с момента их публикации на сайте.</p>
        </section>

        <section class="section">
          <h2>6. Контактная информация</h2>
          <p>По всем вопросам обращайтесь:</p>
          <ul>
            <li>Email: example@company.com</li>
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
  name: 'ConditionsPage',
  data() {
    return {
      currentDate: new Date().toLocaleDateString('ru-RU'),
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.conditions-page {
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
  border-left: 4px solid #3498db;
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