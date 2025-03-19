export interface RouteItem {
  description: string // Направление («туда« или «туда и обратно«)
  have_first_class: boolean // В поезде есть вагон класса «Люкс» (СВ)
  have_second_class: boolean // В поезде есть вагон класса «Купе»
  have_third_class: boolean // В поезде есть вагон класса «Плацкарт»
  have_fourth_class: boolean // В поезде есть вагон с сидячими местами
  have_wifi: boolean // Есть Wi-Fi? (на всём направлении)
  have_air_conditioning: boolean // Есть кондиционер? (на всём направлении)
  is_express: boolean // Экспресс-маршрут (на всём направлении)
  min_price: number // Минимальная цена поездки (на 1 взрослого)
  total_available_seats: number // Количество свободных мест

  arrival: {
    description: string // Информация о поездке туда
    _id: string // Идентификатор
    have_first_class: boolean // В поезде есть вагоны класса «Люкс» (СВ)
    have_second_class: boolean // В поезде есть вагоны класса «Купе»
    have_third_class: boolean // В поезде есть вагоны класса «Плацкарт»
    have_fourth_class: boolean // В поезде есть вагоны с сидячими местами
    have_wifi: boolean // Есть Wi-Fi? (даже если этот флаг указан, Wi-Fi может быть не в каждом вагоне)
    have_air_conditioning: boolean // Есть кондиционер? (даже если этот флаг указан, кондиционер может быть не в каждом вагоне)
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
    min_price: number // Минимальная цена поездки (на 1 взрослого)
    duration: number // Длительность поездки (в секундах)
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
    seats_info: {
      first?: number
      second?: number
      third?: number
      fourth?: number
    }
  }

  departure: {
    description: string // Информация о поездке обратно (если это требуется)
    _id: string // Идентификатор
    have_first_class: boolean // В поезде есть вагоны класса «Люкс» (СВ)
    have_second_class: boolean // В поезде есть вагоны класса «Купе»
    have_third_class: boolean // В поезде есть вагоны класса «Плацкарт»
    have_fourth_class: boolean // В поезде есть вагоны с сидячими местами
    have_wifi: boolean // Есть Wi-Fi? (даже если этот флаг указан, Wi-Fi может быть не в каждом вагоне)
    have_air_conditioning: boolean // Есть кондиционер? (даже если этот флаг указан, кондиционер может быть не в каждом вагоне)
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
    min_price: number // Минимальная цена поездки (на 1 взрослого)
    duration: number // Длительность поездки (в секундах)
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
    seats_info: {
      first?: number
      second?: number
      third?: number
      fourth?: number
    }
  }
}

export interface RoutesResponse {
  total_count: number
  items: RouteItem[]
}
