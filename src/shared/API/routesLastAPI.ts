import useFetch from '../hooks/useFetch'

const useRoutesLastApi = () => {
  return useFetch<any>('/routes/last', '.', 'GET')
}

export default useRoutesLastApi
