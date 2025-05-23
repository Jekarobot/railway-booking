export interface Coach {
  _id: string
  name: string
  class_type: string
  have_wifi: boolean
  have_air_conditioning: boolean
  price: number
  top_price: number
  bottom_price: number
  side_price: number
  linens_price: number
  wifi_price: number
  available_seats: number
  is_linens_included: boolean
  seats: Seat[]
  coach_number?: string
  train: string
}

export interface Seat {
  index: number
  available: boolean
  isTop?: boolean
  isSide?: boolean
}
