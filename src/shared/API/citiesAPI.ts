const BASE_URL = 'https://students.netoservices.ru/fe-diplom'

export const useCitiesApi = async (query: string) => {
  if (!query) {
    return { data: [], loading: false, error: null } // если query пустой, возвращаем пустой массив
  }

  try {
    const response = await fetch(`${BASE_URL}/routes/cities?name=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.json()

    return { data, loading: false, error: null }
  } catch (err) {
    return { data: [], loading: false, error: err as Error }
  }
}
