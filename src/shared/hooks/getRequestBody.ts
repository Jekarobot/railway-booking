import { TicketDetails, Seat } from '../types/Order'

export const getRequestBody = (order: TicketDetails) => {
  const filterSeats = (seats: Seat[]) => {
    return seats.map((seat) => ({
      coach_id: seat.coach_id,
      seat_number: seat.seat_number ?? 0,
      is_child: seat.is_child,
      include_children_seat: seat.include_children_seat,
      person_info: seat.person_info,
    }))
  }

  return {
    user: order.user,
    departure: order.departure.route_direction_id
      ? {
          route_direction_id: order.departure.route_direction_id,
          seats: filterSeats(order.departure.seats),
        }
      : undefined,
    arrival: order.arrival.route_direction_id
      ? {
          route_direction_id: order.arrival.route_direction_id,
          seats: filterSeats(order.arrival.seats),
        }
      : undefined,
  }
}
