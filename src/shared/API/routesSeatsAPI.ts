import useFetch from '../hooks/useFetch'
import { useSearchContext } from '../../providers/SearchProvider/SearchContext'

const useRoutesSeatsApi = (routeId: string) => {
  const { searchParams } = useSearchContext()

  const queryParts: string[] = []

  if (searchParams.have_first_class)
    queryParts.push(`have_first_class=${searchParams.have_first_class}`)
  if (searchParams.have_second_class)
    queryParts.push(`have_second_class=${searchParams.have_second_class}`)
  if (searchParams.have_third_class)
    queryParts.push(`have_third_class=${searchParams.have_third_class}`)
  if (searchParams.have_fourth_class)
    queryParts.push(`have_fourth_class=${searchParams.have_fourth_class}`)
  if (searchParams.have_wifi) queryParts.push(`have_wifi=${searchParams.have_wifi}`)
  if (searchParams.have_air_conditioning)
    queryParts.push(`have_air_conditioning=${searchParams.have_air_conditioning}`)

  const queryString = queryParts.length ? `?${queryParts.join('&')}` : ''

  // console.log(`API called with routeId: ${routeId} and query: ${queryString}`)

  const fetchResult = useFetch<any>(
    routeId ? `/routes/${routeId}/seats` : '',
    queryString || '',
    'GET'
  )

  // console.log(`Fetch status: ${fetchResult.loading ? 'Loading' : 'Completed'}`)

  if (routeId) {
    console.log(`API response: ${JSON.stringify(fetchResult.data)}`)
  }

  return fetchResult
}

export default useRoutesSeatsApi
