'use server'

import { writeFile } from 'fs/promises'
import path from 'path'

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get('file') as File
    if (!file) {
      throw new Error("Файл не найден")
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Создаем уникальное имя файла
    const fileName = `${Date.now()}-${file.name}`
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName)

    await writeFile(filePath, buffer)

    return {
      url: `/uploads/${fileName}`,
      success: true
    }
  } catch (error) {
    console.error('Ошибка загрузки файла:', error)
    return {
      success: false,
      error: 'Ошибка при загрузке файла'
    }
  }
}
