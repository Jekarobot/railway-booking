export interface PersonInfo {
  is_adult: boolean
  first_name: string
  last_name: string
  patronymic: string
  gender: boolean
  birthday: string
  document_type: string
  document_data: string
}

export interface SeatRequest {
  coach_id: string
  seat_number: number
  is_child: boolean
  include_children_seat: boolean
  person_info: PersonInfo
}

export interface DirectionRequest {
  route_direction_id: string
  seats: SeatRequest[]
}

export interface UserRequest {
  first_name: string
  last_name: string
  patronymic: string
  phone: string
  email: string
  payment_method: 'online' | 'cash'
}

export interface OrderRequestBody {
  user: UserRequest
  departure?: DirectionRequest
  arrival?: DirectionRequest
}
