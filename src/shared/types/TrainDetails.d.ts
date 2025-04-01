export default interface Seat {
  index: number
  available: boolean
}

export default interface TrainDetails {
  _id: string
  name: string
  class_type: 'first' | 'second' | 'third'
  have_wifi: boolean
  have_air_conditioning: boolean
  price: number
  top_price: number
  bottom_price: number
  side_price: number
  linens_price: number
  wifi_price: number
  avaliable_seats: number
  is_linens_included: boolean
  seats: Seat[]
  loading: boolean
  setTrainId: (id: string) => void
  fetchTrainDetails: (id: string) => Promise<void>
}
