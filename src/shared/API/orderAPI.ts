import { useState } from 'react'
import { OrderRequestBody } from '../types/RequestBody'

interface OrderApiResponse {
  status: boolean
}

const BASE_URL = 'https://students.netoservices.ru/fe-diplom'

const useOrderApi = () => {
  const [data, setData] = useState<OrderApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const triggerRequest = async (
    requestBody: OrderRequestBody
  ): Promise<OrderApiResponse | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${BASE_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`)
      }

      const result = await response.json()
      setData(result)
      return result
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, triggerRequest }
}

export default useOrderApi
