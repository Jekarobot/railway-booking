import { useEffect } from 'react'
import { useSearchContext } from '../../providers/SearchProvider/SearchContext'
import useFetch from '../hooks/useFetch'
import { Routes } from '../types/Routes'
import { RoutesResponse } from '../types/RoutesResponse'

export const useRoutesAPI = () => {
  const { searchParams, setRoutesResponse, loading, setLoading } = useSearchContext()

  const buildQueryString = (params: Routes) => {
    const queryParts: string[] = []

    const formatDate = (dateString: string) => {
      const [day, month, year] = dateString.split('.')
      return `${year}-${month}-${day}`
    }

    if (params.from_city_id) queryParts.push(`from_city_id=${params.from_city_id}`)
    if (params.to_city_id) queryParts.push(`to_city_id=${params.to_city_id}`)
    if (params.date_start) queryParts.push(`date_start=${formatDate(params.date_start)}`)
    if (params.date_end) queryParts.push(`date_end=${formatDate(params.date_end)}`)
    if (params.date_start_arrival)
      queryParts.push(`date_start_arrival=${params.date_start_arrival}`)
    if (params.date_end_arrival) queryParts.push(`date_end_arrival=${params.date_end_arrival}`)
    if (params.have_first_class !== undefined)
      queryParts.push(`have_first_class=${params.have_first_class}`)
    if (params.have_second_class !== undefined)
      queryParts.push(`have_second_class=${params.have_second_class}`)
    if (params.have_third_class !== undefined)
      queryParts.push(`have_third_class=${params.have_third_class}`)
    if (params.have_fourth_class !== undefined)
      queryParts.push(`have_fourth_class=${params.have_fourth_class}`)
    if (params.have_wifi !== undefined) queryParts.push(`have_wifi=${params.have_wifi}`)
    if (params.have_air_conditioning !== undefined)
      queryParts.push(`have_air_conditioning=${params.have_air_conditioning}`)
    if (params.have_express !== undefined) queryParts.push(`have_express=${params.have_express}`)
    if (params.price_from !== undefined) queryParts.push(`price_from=${params.price_from}`)
    if (params.price_to !== undefined) queryParts.push(`price_to=${params.price_to}`)
    if (params.start_departure_hour_from !== undefined)
      queryParts.push(`start_departure_hour_from=${params.start_departure_hour_from}`)
    if (params.start_departure_hour_to !== undefined)
      queryParts.push(`start_departure_hour_to=${params.start_departure_hour_to}`)
    if (params.start_arrival_hour_from !== undefined)
      queryParts.push(`start_arrival_hour_from=${params.start_arrival_hour_from}`)
    if (params.start_arrival_hour_to !== undefined)
      queryParts.push(`start_arrival_hour_to=${params.start_arrival_hour_to}`)
    if (params.end_departure_hour_from !== undefined)
      queryParts.push(`end_departure_hour_from=${params.end_departure_hour_from}`)
    if (params.end_departure_hour_to !== undefined)
      queryParts.push(`end_departure_hour_to=${params.end_departure_hour_to}`)
    if (params.end_arrival_hour_from !== undefined)
      queryParts.push(`end_arrival_hour_from=${params.end_arrival_hour_from}`)
    if (params.end_arrival_hour_to !== undefined)
      queryParts.push(`end_arrival_hour_to=${params.end_arrival_hour_to}`)
    if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`)
    if (params.offset !== undefined) queryParts.push(`offset=${params.offset}`)
    if (params.sort) queryParts.push(`sort=${params.sort}`)

    return queryParts.join('&')
  }

  // Формируем queryString только если заданы ID городов
  const queryString =
    searchParams.from_city_id && searchParams.to_city_id ? buildQueryString(searchParams) : null

  const { data, error } = useFetch<RoutesResponse>('/routes', queryString || '', 'GET')

  useEffect(() => {
    if (queryString) {
      setLoading(true)
    }
  }, [queryString])

  useEffect(() => {
    if (data) {
      setRoutesResponse(data)
      setLoading(false)
    }
  }, [data, setRoutesResponse])

  return { data, loading, error }
}
