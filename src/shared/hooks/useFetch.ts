import { useState, useEffect } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

const BASE_URL = 'https://students.netoservices.ru/fe-diplom'

function useFetch<T>(
  endpoint: string,
  params: string,
  method: 'GET' | 'POST',
  body?: any
): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!params && method === 'GET') return
      try {
        setLoading(true)
        const options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: method === 'POST' ? JSON.stringify(body) : undefined,
        }
        const response = await fetch(
          `${BASE_URL}${endpoint}${method === 'GET' ? `?name=${params}` : ''}`,
          options
        )
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint, params, method, body])

  return { data, loading, error }
}

export default useFetch
