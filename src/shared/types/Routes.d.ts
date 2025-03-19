export interface Routes {
  from_city_input: string
  to_city_input: string
  from_city_id: string
  to_city_id: string
  date_start?: string
  date_end?: string
  date_start_arrival?: string
  date_end_arrival?: string
  have_first_class?: boolean
  have_second_class?: boolean
  have_third_class?: boolean
  have_fourth_class?: boolean
  have_wifi?: boolean
  have_air_conditioning?: boolean
  have_express?: boolean
  price_from?: number
  price_to?: number
  initial_price_from?: number
  initial_price_to?: number
  start_departure_hour_from?: number
  start_departure_hour_to?: number
  start_arrival_hour_from?: number
  start_arrival_hour_to?: number
  end_departure_hour_from?: number
  end_departure_hour_to?: number
  end_arrival_hour_from?: number
  end_arrival_hour_to?: number
  limit?: number
  offset?: number
  sort?: 'date' | 'price' | 'duration'
}
