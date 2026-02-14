<template>
  <div class="policy-page">
    <div class="container">
      <!-- Заголовок -->
      <header class="page-header">
        <h1>Privacy Policy</h1>
        <p class="last-updated">Last updated: {{ currentDate }}</p>
      </header>

      <!-- Основное содержание -->
      <main class="content">
        <section class="section">
          <h2>1. General Provisions</h2>
          <p>This Privacy Policy regulates the procedure for collecting, storing, using, and disclosing the personal data of Users.</p>
          <p>By using this website, you agree to the terms of this Privacy Policy.</p>
        </section>

        <section class="section">
          <h2>2. Information We Collect</h2>
          <h3>2.1. Personal data:</h3>
          <ul>
            <li>Name and contact information</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Demographic data</li>
          </ul>

          <h3>2.2. Technical information:</h3>
          <ul>
            <li>IP address and location data</li>
            <li>Browser type and operating system</li>
            <li>Time and date of visit</li>
            <li>Pages you view</li>
          </ul>
        </section>

        <section class="section">
          <h2>3. Purposes of Data Collection</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Communicate with Users</li>
            <li>Analyze website usage</li>
            <li>Personalize content</li>
            <li>Send notifications and updates</li>
          </ul>
        </section>

        <section class="section">
          <h2>4. Data Protection</h2>
          <p>We take the necessary organizational and technical measures to protect your personal data from:</p>
          <ul>
            <li>Unauthorized access</li>
            <li>Modification</li>
            <li>Disclosure</li>
            <li>Destruction</li>
          </ul>
        </section>

        <section class="section">
          <h2>5. Disclosure to Third Parties</h2>
          <p>We do not share your personal data with third parties, except in the following cases:</p>
          <ul>
            <li>With your explicit consent</li>
            <li>When required by law</li>
            <li>To protect our legal rights</li>
            <li>With partners who provide services on our behalf</li>
          </ul>
        </section>

        <section class="section">
          <h2>6. Cookies</h2>
          <p>We use cookies to:</p>
          <ul>
            <li>Remember your preferences</li>
            <li>Analyze website traffic</li>
            <li>Improve user experience</li>
          </ul>
          <p>You can disable cookies in your browser settings.</p>
        </section>

        <section class="section">
          <h2>7. User Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your personal data</li>
            <li>Withdraw consent for processing</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section class="section">
          <h2>8. Policy Changes</h2>
          <p>We reserve the right to make changes to this Privacy Policy.</p>
          <p>We will notify you of changes by posting a new version of the Policy on the website.</p>
        </section>

        <section class="section">
          <h2>9. Contact Information</h2>
          <p>If you have questions related to the processing of personal data, please contact us:</p>
          <ul>
            <li>Email: privacy@company.com</li>
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
  name: 'PolicyPage',
  data() {
    return {
      currentDate: new Date().toLocaleDateString('en-US'),
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
