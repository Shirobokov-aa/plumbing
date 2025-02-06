const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getBathroomPage() {
  try {
    const response = await fetch(`${BASE_URL}/api/bathroomPage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Отключаем кеширование для получения актуальных данных
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bathroom page:', error);
    throw error;
  }
}