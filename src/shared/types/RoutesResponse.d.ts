export interface RouteItem {
  have_first_class: boolean
  have_second_class: boolean
  have_third_class: boolean
  have_fourth_class: boolean
  have_wifi: boolean
  have_air_conditioning: boolean
  is_express: boolean
  min_price: number
  available_seats: number
  available_seats_info: {
    first?: number
    second?: number
    third?: number
    fourth?: number
  }
  departure: {
    _id: string
    have_first_class: boolean
    have_second_class: boolean
    have_third_class: boolean
    have_fourth_class: boolean
    have_wifi: boolean
    have_air_conditioning: boolean
    is_express: boolean
    min_price: number
    duration: number
    available_seats: number
    available_seats_info: {
      first?: number
      second?: number
      third?: number
      fourth?: number
    }
    train: {
      _id: string
      name: string
    }
    from: {
      railway_station_name: string
      city: {
        _id: string
        name: string
      }
      datetime: number
    }
    to: {
      railway_station_name: string
      city: {
        _id: string
        name: string
      }
      datetime: number
    }
    price_info: {
      first?: {
        price?: number
        top_price?: number
        bottom_price?: number
      }
      second?: {
        top_price?: number
        bottom_price?: number
      }
      third?: {
        top_price?: number
        bottom_price?: number
        side_price?: number
      }
    }
  }
}

export interface RoutesResponse {
  total_count: number
  items: RouteItem[]
}
