import { useState, useEffect } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

const BASE_URL = 'https://students.netoservices.ru/fe-diplom'

function useFetch<T>(
  endpoint: string,
  params?: string,
  method: 'GET' | 'POST' = 'GET',
  body?: any
): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!endpoint) {
      setLoading(false)
      setError(new Error('Endpoint is required'))
      return
    }

    let isMounted = true

    const fetchData = async () => {
      setLoading(true)

      try {
        const url = `${BASE_URL}${endpoint}${params ? `?${params}` : ''}`
        const options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: method === 'POST' ? JSON.stringify(body) : undefined,
        }

        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }

        const result = await response.json()
        if (isMounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [endpoint, params, method, JSON.stringify(body)])

  return { data, loading, error }
}

export default useFetch
