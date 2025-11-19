const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Функции для работы с файлом
const loadSuggestions = () => {
  try {
    const data = fs.readFileSync('suggestions.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return []; // Если файла нет - пустой массив
  }
};

const saveSuggestions = (suggestions) => {
  fs.writeFileSync('suggestions.json', JSON.stringify(suggestions, null, 2));
};

// Загружаем предложения при запуске
let suggestions = loadSuggestions();

let users = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'host'
  }
];

// 📝 API для предложений - ДОСТУПНО ВСЕМ
app.get('/api/suggestions', (req, res) => {
  res.json(suggestions);
});

app.post('/api/suggestions', (req, res) => {
  const { name, message } = req.body;
  
  if (!name || !message) {
    return res.status(400).json({ error: 'Имя и сообщение обязательны' });
  }
  
  const newSuggestion = {
    id: uuidv4(),
    name,
    message,
    date: new Date().toISOString(),
    status: 'new',
    likes: 0,
    likedBy: []
  };

  suggestions.push(newSuggestion);
  saveSuggestions(suggestions); // ← СОХРАНЯЕМ В ФАЙЛ
  res.status(201).json(newSuggestion);
});

// 👍 Лайки - ДОСТУПНО ВСЕМ (без регистрации)
app.post('/api/suggestions/:id/like', (req, res) => {
  const suggestion = suggestions.find(s => s.id === req.params.id);
  if (!suggestion) {
    return res.status(404).json({ error: 'Предложение не найдено' });
  }

  suggestion.likes = (suggestion.likes || 0) + 1;
  saveSuggestions(suggestions); // ← СОХРАНЯЕМ В ФАЙЛ
  
  res.json({ 
    success: true,
    likes: suggestion.likes
  });
});

// 🔐 ПРОСТАЯ АУТЕНТИФИКАЦИЯ ТОЛЬКО ДЛЯ АДМИНОВ
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    res.json({
      success: true,
      message: 'Вход выполнен как администратор!',
      user: {
        username: 'admin',
        role: 'host'
      }
    });
  } else {
    res.status(401).json({ error: 'Неверные учетные данные' });
  }
});

// ✅ Модерация - ТОЛЬКО ДЛЯ АДМИНОВ
app.patch('/api/suggestions/:id/status', (req, res) => {
  const { status } = req.body;
  const suggestion = suggestions.find(s => s.id === req.params.id);
  
  if (!suggestion) {
    return res.status(404).json({ error: 'Предложение не найдено' });
  }

  suggestion.status = status;
  saveSuggestions(suggestions); // ← СОХРАНЯЕМ В ФАЙЛ
  res.json({ success: true, suggestion });
});

// 🗑️ Удаление - ТОЛЬКО ДЛЯ АДМИНОВ
app.delete('/api/suggestions/:id', (req, res) => {
  const index = suggestions.findIndex(s => s.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Предложение не найдено' });
  }

  suggestions.splice(index, 1);
  saveSuggestions(suggestions); // ← СОХРАНЯЕМ В ФАЙЛ
  res.json({ success: true, message: 'Предложение удалено' });
});

// 🚀 Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`💾 Данные сохраняются в файл suggestions.json`);
});