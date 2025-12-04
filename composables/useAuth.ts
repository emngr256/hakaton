// Файл: composables/useAuth.ts

export const useAuth = () => {
  // Состояния
  const isAdmin = useState('isAdmin', () => false)
  const adminUser = useState('adminUser', () => null)
  const isLoading = useState('authLoading', () => false)

  // Функции авторизации
  const adminLogin = async (credentials: { login: string; password: string }) => {
    isLoading.value = true
    try {
      // Простая проверка логина/пароля
      if (credentials.login === 'admin' && credentials.password === 'admin123') {
        isAdmin.value = true
        adminUser.value = {
          id: 1,
          login: 'admin',
          role: 'admin',
          name: 'Администратор'
        }
        
        // Сохраняем в localStorage
        if (process.client) {
          localStorage.setItem('isAdmin', 'true')
          localStorage.setItem('adminUser', JSON.stringify(adminUser.value))
        }
        
        return { success: true }
      } else {
        return { success: false, error: 'Неверный логин или пароль' }
      }
    } catch (error: any) {
      console.error('Ошибка входа:', error)
      return { 
        success: false, 
        error: error.data?.error || 'Ошибка соединения с сервером' 
      }
    } finally {
      isLoading.value = false
    }
  }

  const adminLogout = () => {
    isAdmin.value = false
    adminUser.value = null
    
    if (process.client) {
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('adminUser')
    }
  }

  const checkAdminAuth = () => {
    if (process.client) {
      const savedAdmin = localStorage.getItem('isAdmin')
      if (savedAdmin === 'true') {
        isAdmin.value = true
        const savedUser = localStorage.getItem('adminUser')
        if (savedUser) {
          adminUser.value = JSON.parse(savedUser)
        }
      }
    }
  }

  return {
    isAdmin: readonly(isAdmin),
    adminUser: readonly(adminUser),
    isLoading: readonly(isLoading),
    adminLogin,
    adminLogout,
    checkAdminAuth
  }
}