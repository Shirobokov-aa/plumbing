'use server'

// import { cookies } from 'next/headers'

interface LoginForm {
  email: string
  password: string
}

export async function login(data: LoginForm) {
  // Временное решение - всегда успешный вход
  return { success: true }

  /* Закомментированный код для будущего использования
  try {
    const isValid = data.email === process.env.ADMIN_EMAIL &&
                   data.password === process.env.ADMIN_PASSWORD

    if (isValid) {
      const cookieStore = cookies()
      cookieStore.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24
      })
      return { success: true }
    }

    return { success: false, error: 'Неверный email или пароль' }
  } catch (error) {
    return { success: false, error: 'Произошла ошибка при входе' }
  }
  */
}
