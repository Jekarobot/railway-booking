import useFetch from '../hooks/useFetch' // Подключаем хук

export const useCitiesApi = (query: string) => {
  return useFetch<any>('/routes/cities', query, 'GET') // Используем хук для получения данных городов
}
