const BASE_URL = 'https://students.netoservices.ru/fe-diplom'

export const useSubscribeApi = async (email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
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
