<script setup lang="ts">
// ... остальной код ...

// Загрузка при монтировании
onMounted(() => {
  loadSuggestions();
});

const loadSuggestions = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/suggestions');
    suggestions.value = await response.json();
  } catch (error) {
    console.error('Ошибка загрузки предложений:', error);
    // Фолбэк на localStorage если сервер недоступен
    const saved = localStorage.getItem('lakeSuggestions');
    suggestions.value = saved ? JSON.parse(saved) : [];
  }
}

// 🔐 Вход для админа
const login = async () => {
  if (loginData.value.username === 'admin' && loginData.value.password === 'admin123') {
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData.value)
      });
      
      const result = await response.json();
      
      if (result.success) {
        user.value = result.user;
        loginData.value = { username: '', password: '' };
        alert('Вход выполнен как администратор!');
      } else {
        alert(result.error || 'Ошибка входа');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      alert('Ошибка соединения с сервером');
    }
  } else {
    alert('Неверные учетные данные');
  }
};

// 👍 Лайки
const likeSuggestion = async (suggestionId: string) => {
  try {
    const response = await fetch(`http://localhost:3001/api/suggestions/${suggestionId}/like`, {
      method: 'POST'
    });
    
    const result = await response.json();
    
    if (result.success) {
      const suggestion = suggestions.value.find(s => s.id === suggestionId);
      if (suggestion) {
        suggestion.likes = result.likes;
      }
    }
  } catch (error) {
    console.error('Ошибка лайка:', error);
    // Фолбэк на локальное обновление
    const suggestion = suggestions.value.find(s => s.id === suggestionId);
    if (suggestion) {
      suggestion.likes = (suggestion.likes || 0) + 1;
      saveToLocalStorage();
    }
  }
};

// ✅ Изменение статуса
const changeStatus = async (id: string, newStatus: string) => {
  if (!user.value) return;
  
  try {
    const response = await fetch(`http://localhost:3001/api/suggestions/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus })
    });
    
    const result = await response.json();
    
    if (result.success) {
      const suggestion = suggestions.value.find(s => s.id === id);
      if (suggestion) {
        suggestion.status = newStatus;
      }
    }
  } catch (error) {
    console.error('Ошибка изменения статуса:', error);
    // Фолбэк на локальное обновление
    const suggestion = suggestions.value.find(s => s.id === id);
    if (suggestion) {
      suggestion.status = newStatus;
      saveToLocalStorage();
    }
  }
};

// 🗑️ Удаление
const deleteSuggestion = async (id: string) => {
  if (!user.value) return;
  
  if (confirm('Удалить это предложение?')) {
    try {
      const response = await fetch(`http://localhost:3001/api/suggestions/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        suggestions.value = suggestions.value.filter(s => s.id !== id);
      }
    } catch (error) {
      console.error('Ошибка удаления:', error);
      // Фолбэк на локальное удаление
      suggestions.value = suggestions.value.filter(s => s.id !== id);
      saveToLocalStorage();
    }
  }
};

// 💾 Сохранение в localStorage (только как фолбэк)
const saveToLocalStorage = () => {
  localStorage.setItem('lakeSuggestions', JSON.stringify(suggestions.value));
};

// ... остальной код без изменений ...
</script>