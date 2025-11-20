require('dotenv').config();

const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Подключение к PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

// Создание таблицы если её нет
const initTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS suggestions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'new',
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        likes INTEGER DEFAULT 0,
        is_pinned BOOLEAN DEFAULT FALSE,
        priority INTEGER DEFAULT 0
      )
    `)
    console.log('✅ Table "suggestions" created/verified')
  } catch (error) {
    console.error('❌ Error creating table:', error)
  }
}

// Проверка подключения
const testConnection = async () => {
  try {
    const dbResult = await pool.query('SELECT current_database() as db_name')
    console.log('✅ Connected to database:', dbResult.rows[0].db_name)
    
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'suggestions'
      ) as table_exists
    `)
    console.log('✅ Table "suggestions" exists:', tableCheck.rows[0].table_exists)
  } catch (error) {
    console.error('❌ Connection test failed:', error.message)
  }
}

// Инициализация
initTable()
testConnection()

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' })
})

// Получить все предложения
app.get('/api/suggestions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM suggestions ORDER BY is_pinned DESC, priority DESC, date DESC')
    res.json(result.rows)
  } catch (error) {
    console.error('Error getting suggestions:', error)
    res.status(500).json({ error: error.message })
  }
})

// Добавить предложение
app.post('/api/suggestions', async (req, res) => {
  try {
    const { name, message } = req.body
    
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' })
    }

    const result = await pool.query(
      'INSERT INTO suggestions (name, message) VALUES ($1, $2) RETURNING *',
      [name, message]
    )
    
    console.log('✅ New suggestion added:', result.rows[0].id)
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error creating suggestion:', error)
    res.status(500).json({ error: error.message })
  }
})

// Лайк предложения
app.post('/api/suggestions/:id/like', async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('UPDATE suggestions SET likes = likes + 1 WHERE id = $1', [id])
    res.json({ success: true })
  } catch (error) {
    console.error('Error liking suggestion:', error)
    res.status(500).json({ error: error.message })
  }
})

// Изменение статуса
app.put('/api/suggestions/:id/status', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    await pool.query('UPDATE suggestions SET status = $1 WHERE id = $2', [status, id])
    res.json({ success: true })
  } catch (error) {
    console.error('Error updating status:', error)
    res.status(500).json({ error: error.message })
  }
})

// Удаление предложения
app.delete('/api/suggestions/:id', async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM suggestions WHERE id = $1', [id])
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting suggestion:', error)
    res.status(500).json({ error: error.message })
  }
})

// Закрепить/открепить предложение
app.put('/api/suggestions/:id/pin', async (req, res) => {
  try {
    const { id } = req.params
    const { isPinned } = req.body
    await pool.query('UPDATE suggestions SET is_pinned = $1 WHERE id = $2', [isPinned, id])
    res.json({ success: true })
  } catch (error) {
    console.error('Error pinning suggestion:', error)
    res.status(500).json({ error: error.message })
  }
})

// Установить приоритет
app.put('/api/suggestions/:id/priority', async (req, res) => {
  try {
    const { id } = req.params
    const { priority } = req.body
    await pool.query('UPDATE suggestions SET priority = $1 WHERE id = $2', [priority, id])
    res.json({ success: true })
  } catch (error) {
    console.error('Error setting priority:', error)
    res.status(500).json({ error: error.message })
  }
})

// Логин админа
app.post('/api/auth/login', (req, res) => {
  const { login, password } = req.body
  
  if (login === 'admin' && password === 'admin123') {
    res.json({ success: true, message: 'Login successful' })
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`)
})
