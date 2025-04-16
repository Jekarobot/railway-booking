export interface PersonInfo {
  is_adult: boolean // Взрослый/детский
  first_name: string // Имя
  last_name: string // Фамилия
  patronymic: string // Отчество
  gender: boolean // Пол (true - мужской)
  birthday: string // День рождения (в формате YYYY-MM-DD)
  document_type: string // Тип документа
  document_data: string // Данные документа (одной строкой)
}

export interface Seat {
  coach_id: string // Идентификатор вагона
  person_info: PersonInfo
  seat_number: number | null // Номер места в вагоне
  is_child: boolean // Детский билет
  include_children_seat: boolean // Необходимо ли доп. место для билета «Детский без места»?
  total_price?: number
  seat_id: string
}

export interface RouteDetails {
  route_direction_id: string // Идентификатор направления в заказе
  seats: Seat[] // Список заказанных мест
}

export interface User {
  first_name: string // Имя
  last_name: string // Фамилия
  patronymic: string // Отчество
  phone: string // Телефон
  email: string // E-mail
  payment_method: 'cash' | 'online' // Способ оплаты (принимает значения cash или online)
}

export interface TicketDetails {
  user: User
  departure: RouteDetails
  arrival: RouteDetails
}
