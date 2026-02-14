<template>
  <div class="conditions-page">
    <div class="container">
      <!-- Заголовок -->
      <header class="page-header">
        <h1>Terms of Use</h1>
        <p class="last-updated">Last updated: {{ currentDate }}</p>
      </header>

      <!-- Основное содержание -->
      <main class="content">
        <section class="section">
          <h2>1. General Provisions</h2>
          <p>These Terms of Use govern the relationship between the User and the Website Administration.</p>
          <p>By using this website, you agree to these Terms.</p>
        </section>

        <section class="section">
          <h2>2. Rights and Obligations of the Parties</h2>
          <h3>2.1. The User agrees to:</h3>
          <ul>
            <li>Comply with the legislation of the Republic of Kazakhstan</li>
            <li>Not post illegal content</li>
            <li>Not perform actions that may disrupt the operation of the website</li>
            <li>Not use the website to distribute spam</li>
          </ul>

        <h3>2.2. The Administration agrees to:</h3>
          <ul>
            <li>Ensure the proper functioning of the website</li>
            <li>Protect users’ personal data</li>
            <li>Review user inquiries</li>
          </ul>
        </section>

        <section class="section">
          <h2>3. Intellectual Property</h2>
          <p>All materials posted on the website are the intellectual property of the Administration unless otherwise stated.</p>
        </section>

        <section class="section">
          <h2>4. Limitation of Liability</h2>
          <p>The Administration is not responsible for:</p>
          <ul>
            <li>User actions</li>
            <li>Content of external websites</li>
            <li>Temporary technical failures in the operation of the website</li>
          </ul>
        </section>

        <section class="section">
          <h2>5. Amendments to the Terms</h2>
          <p>The Administration reserves the right to modify these Terms at any time.</p>
          <p>Changes take effect from the moment they are published on the website.</p>
        </section>

        <section class="section">
          <h2>6. Contact Information</h2>
          <p>For all inquiries, please contact:</p>
          <ul>
            <li>Email: example@company.com</li>
            <li>Phone: +7 (XXX) XXX-XX-XX</li>
            <li>Address: Petropavlovsk, Pushkina St.</li>
          </ul>
        </section>
      </main>

      <!-- Футер -->
      <footer class="page-footer">
        <p>© {{ currentYear }} All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConditionsPage',
  data() {
    return {
      currentDate: new Date().toLocaleDateString('en-US'),
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
