import useFetch from '../hooks/useFetch'

export const useCitiesApi = (query: string) => {
  return useFetch<any>('/routes/cities', query, 'GET')
}
